"""
Enhanced embedding generation using Sentence Transformers
Provides semantic understanding for better RAG retrieval
"""

from typing import List, Optional
import numpy as np
from sentence_transformers import SentenceTransformer, CrossEncoder
import logging

logger = logging.getLogger(__name__)

# Global model instances (loaded once)
_embedding_model: Optional[SentenceTransformer] = None
_reranker_model: Optional[CrossEncoder] = None

# Model configuration
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'  # 384 dimensions, fast and accurate
RERANKER_MODEL_NAME = 'cross-encoder/ms-marco-MiniLM-L-6-v2'
EMBEDDING_DIM = 384


def get_embedding_model() -> SentenceTransformer:
    """
    Get or initialize the embedding model (singleton pattern)
    """
    global _embedding_model
    
    if _embedding_model is None:
        try:
            logger.info(f"Loading embedding model: {EMBEDDING_MODEL_NAME}")
            _embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
            logger.info("Embedding model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load embedding model: {e}")
            raise
    
    return _embedding_model


def get_reranker_model() -> CrossEncoder:
    """
    Get or initialize the re-ranker model (singleton pattern)
    """
    global _reranker_model
    
    if _reranker_model is None:
        try:
            logger.info(f"Loading re-ranker model: {RERANKER_MODEL_NAME}")
            _reranker_model = CrossEncoder(RERANKER_MODEL_NAME)
            logger.info("Re-ranker model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load re-ranker model: {e}")
            raise
    
    return _reranker_model


def generate_embedding(text: str) -> List[float]:
    """
    Generate semantic embedding for given text
    
    Args:
        text: Input text to embed
        
    Returns:
        List of 384 floats representing the embedding
    """
    if not text or not text.strip():
        logger.warning("Empty text provided for embedding")
        return [0.0] * EMBEDDING_DIM
    
    try:
        model = get_embedding_model()
        
        # Generate embedding
        embedding = model.encode(
            text,
            convert_to_numpy=True,
            normalize_embeddings=True  # Normalize for cosine similarity
        )
        
        return embedding.tolist()
        
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        # Return zero vector as fallback
        return [0.0] * EMBEDDING_DIM


def generate_embeddings_batch(texts: List[str], batch_size: int = 32) -> List[List[float]]:
    """
    Generate embeddings for multiple texts efficiently
    
    Args:
        texts: List of texts to embed
        batch_size: Number of texts to process at once
        
    Returns:
        List of embeddings
    """
    if not texts:
        return []
    
    try:
        model = get_embedding_model()
        
        # Generate embeddings in batches
        embeddings = model.encode(
            texts,
            batch_size=batch_size,
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=len(texts) > 100  # Show progress for large batches
        )
        
        return [emb.tolist() for emb in embeddings]
        
    except Exception as e:
        logger.error(f"Error generating batch embeddings: {e}")
        # Return zero vectors as fallback
        return [[0.0] * EMBEDDING_DIM for _ in texts]


def rerank_results(query: str, documents: List[str], top_k: Optional[int] = None) -> List[tuple]:
    """
    Re-rank documents based on relevance to query using cross-encoder
    
    Args:
        query: Search query
        documents: List of document texts to rank
        top_k: Number of top results to return (None = all)
        
    Returns:
        List of (index, score) tuples sorted by relevance
    """
    if not documents:
        return []
    
    try:
        reranker = get_reranker_model()
        
        # Create query-document pairs
        pairs = [(query, doc) for doc in documents]
        
        # Get relevance scores
        scores = reranker.predict(pairs)
        
        # Create (index, score) tuples and sort by score
        ranked = [(idx, float(score)) for idx, score in enumerate(scores)]
        ranked.sort(key=lambda x: x[1], reverse=True)
        
        # Return top_k if specified
        if top_k is not None:
            ranked = ranked[:top_k]
        
        return ranked
        
    except Exception as e:
        logger.error(f"Error re-ranking results: {e}")
        # Return original order with neutral scores
        return [(idx, 0.5) for idx in range(len(documents))]


def compute_similarity(embedding1: List[float], embedding2: List[float]) -> float:
    """
    Compute cosine similarity between two embeddings
    
    Args:
        embedding1: First embedding vector
        embedding2: Second embedding vector
        
    Returns:
        Similarity score between 0 and 1
    """
    try:
        # Convert to numpy arrays
        vec1 = np.array(embedding1)
        vec2 = np.array(embedding2)
        
        # Compute cosine similarity
        similarity = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
        
        return float(similarity)
        
    except Exception as e:
        logger.error(f"Error computing similarity: {e}")
        return 0.0


# Preload models on module import (optional, for faster first request)
def preload_models():
    """
    Preload models to avoid cold start delay
    Call this during application startup
    """
    try:
        logger.info("Preloading embedding and re-ranking models...")
        get_embedding_model()
        get_reranker_model()
        logger.info("Models preloaded successfully")
    except Exception as e:
        logger.warning(f"Failed to preload models: {e}")


if __name__ == "__main__":
    # Test the embedding generation
    logging.basicConfig(level=logging.INFO)
    
    test_texts = [
        "What is the project deadline?",
        "When is the due date?",
        "The weather is nice today"
    ]
    
    print("Testing embedding generation...")
    for text in test_texts:
        emb = generate_embedding(text)
        print(f"Text: {text}")
        print(f"Embedding dimension: {len(emb)}")
        print(f"First 5 values: {emb[:5]}")
        print()
    
    print("Testing similarity...")
    emb1 = generate_embedding(test_texts[0])
    emb2 = generate_embedding(test_texts[1])
    emb3 = generate_embedding(test_texts[2])
    
    sim_12 = compute_similarity(emb1, emb2)
    sim_13 = compute_similarity(emb1, emb3)
    
    print(f"Similarity between '{test_texts[0]}' and '{test_texts[1]}': {sim_12:.4f}")
    print(f"Similarity between '{test_texts[0]}' and '{test_texts[2]}': {sim_13:.4f}")
    print()
    
    print("Testing re-ranking...")
    query = "project deadline"
    docs = test_texts
    ranked = rerank_results(query, docs, top_k=3)
    
    print(f"Query: {query}")
    for idx, score in ranked:
        print(f"  {score:.4f}: {docs[idx]}")
