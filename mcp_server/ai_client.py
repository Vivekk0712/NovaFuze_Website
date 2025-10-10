import os
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel('gemini-2.5-pro')

def generate_from_prompt(prompt: str, context: list[dict], user_name: str = None):
    """
    Generates a response from the Gemini model.
    """
    # Build user context
    user_context = ""
    if user_name:
        user_context = f"You are talking to {user_name}. "
    
    # Build context string from chat history
    context_str = ""
    if context:
        for message in context[-5:]:  # Only use last 5 messages to avoid token limits
            role = "Assistant" if message['role'] == 'assistant' else "User"
            context_str += f"{role}: {message['content']}\n"
    
    # Combine all context
    if context_str:
        full_prompt = f"{user_context}Previous conversation:\n{context_str}\nCurrent message: {prompt}"
    else:
        full_prompt = f"{user_context}Current message: {prompt}"

    # Use simple generate_content instead of chat
    response = model.generate_content(full_prompt)
    return response.text
