import os
import re
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel('gemini-2.5-pro')

def expand_query(query: str, conversation_context: list[dict] = None) -> list[str]:
    """
    Expand user query with synonyms and alternative phrasings for better retrieval
    
    Args:
        query: Original user query
        conversation_context: Recent conversation for context
        
    Returns:
        List of expanded queries (including original)
    """
    try:
        # Build context string
        context_str = ""
        if conversation_context and len(conversation_context) > 0:
            recent_context = conversation_context[-3:]  # Last 3 messages
            for msg in recent_context:
                role = "User" if msg['role'] == 'user' else "Assistant"
                context_str += f"{role}: {msg['content']}\n"
        
        expansion_prompt = f"""Given this conversation context and user query, generate 2 alternative phrasings that capture the same intent.
Include synonyms and related terms. Keep each alternative concise (one line).

{context_str if context_str else "No prior context."}

User Query: {query}

Generate 2 alternative queries (one per line, no numbering):"""
        
        response = model.generate_content(expansion_prompt)
        expanded = response.text.strip().split('\n')
        
        # Clean and filter expansions
        expansions = [query]  # Always include original
        for exp in expanded[:2]:  # Take top 2
            exp = exp.strip()
            # Remove numbering, bullets, etc.
            exp = re.sub(r'^[\d\.\-\*\)]+\s*', '', exp)
            if exp and exp != query and len(exp) > 3:
                expansions.append(exp)
        
        return expansions[:3]  # Max 3 total (original + 2 expansions)
        
    except Exception as e:
        print(f"Query expansion failed: {e}")
        return [query]  # Fallback to original query

def generate_from_prompt(prompt: str, context: list[dict], user_name: str = None, file_context: list[dict] = None):
    """
    Generates a response from the Gemini model with optional file context.
    """
    # System prompt to define AI behavior (silent RAG)
    system_prompt = """You are a helpful AI assistant. Be polite, professional, and helpful.
Only use any provided context internally to craft the most accurate and natural answer.
Do not mention, imply, or speculate about where information came from (e.g., documents, files, databases, storage, Supabase, or pages).
Do not say things like "based on the document", "from the database", or cite filenames/pages.
If the answer is unknown, say so briefly and suggest what would be needed.
Keep responses concise and natural.
"""
    
    # Build user context
    user_context = ""
    if user_name:
        user_context = f"The user's name is {user_name}. "
    
    # Build conversation context string
    context_str = ""
    if context:
        for message in context:
            role = "Assistant" if message['role'] == 'assistant' else "User"
            context_str += f"{role}: {message['content']}\n"
    
    # Build file context string (internal only, no citations)
    file_context_str = ""
    if file_context:
        file_context_str = "\n\nContext for internal use only (do not mention its existence in the answer):\n"
        for chunk in file_context:
            content = chunk.get('content', '')
            # Do not include filename/page or similarity hints to avoid leakage
            file_context_str += f"---\n{content}\n"
    
    # Combine all context with system prompt
    if context_str and file_context_str:
        full_prompt = f"{system_prompt}\n\n{user_context}Previous conversation:\n{context_str}{file_context_str}\nCurrent message: {prompt}"
    elif context_str:
        full_prompt = f"{system_prompt}\n\n{user_context}Previous conversation:\n{context_str}\nCurrent message: {prompt}"
    elif file_context_str:
        full_prompt = f"{system_prompt}\n\n{user_context}{file_context_str}\nCurrent message: {prompt}"
    else:
        full_prompt = f"{system_prompt}\n\n{user_context}Current message: {prompt}"

    # Generate
    response = model.generate_content(full_prompt)
    text = (response.text or "").strip()

    # Last-resort sanitization to remove meta-source phrases and salutations
    banned_keyword_fragments = [
        "based on the document", "from the document", "from the database",
        "according to the document", "uploaded file", "the document titled",
        "from supabase", "from your files", "as per the document",
        "according to the timetable", "based on the timetable", "from the timetable",
        "according to your upload", "you uploaded"
    ]

    # Remove lines/sentences that contain banned phrases (case-insensitive)
    sentences = re.split(r"(?<=[.!?])\s+", text)
    cleaned_sentences = []
    for s in sentences:
        sl = s.lower()
        if not any(k in sl for k in banned_keyword_fragments):
            cleaned_sentences.append(s)
    text = " ".join(cleaned_sentences).strip() or text

    # Remove greeting lines like "Hello, <name>" or "Hello Naruto Uzumaki"
    text = re.sub(r"^\s*hello[\s,]+[\w .'-]+[:,-]?\s*", "", text, flags=re.IGNORECASE)

    # Collapse excessive whitespace
    text = re.sub(r"\n{3,}", "\n\n", text).strip()

    return text
