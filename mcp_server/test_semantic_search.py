#!/usr/bin/env python3
"""
Test script to verify semantic embeddings are working correctly
This tests the improved search accuracy with semantic understanding
"""

import os
from dotenv import load_dotenv
from embeddings import generate_embedding
from supabase_client import init_supabase

load_dotenv()

def test_semantic_search():
    """Test semantic search with various query types"""
    
    print("=" * 70)
    print("SEMANTIC EMBEDDINGS TEST")
    print("=" * 70)
    print()
    
    # Initialize Supabase
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    if not supabase_url or not supabase_key:
        print("❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        return
    
    supabase = init_supabase(supabase_url, supabase_key)
    
    if not supabase:
        print("❌ Failed to connect to Supabase")
        return
    
    print("✅ Connected to Supabase")
    print()
    
    # Check if we have any embeddings
    try:
        result = supabase.table('embeddings').select('id', count='exact').execute()
        embedding_count = result.count if hasattr(result, 'count') else len(result.data)
        
        if embedding_count == 0:
            print("⚠️  No embeddings found in database")
            print("   Upload some documents first, then run this test")
            return
        
        print(f"📊 Found {embedding_count} embeddings in database")
        print()
    except Exception as e:
        print(f"❌ Error checking embeddings: {e}")
        return
    
    # Test queries that demonstrate semantic understanding
    test_queries = [
        {
            "query": "What is the project deadline?",
            "description": "Direct question about deadlines",
            "similar_to": ["due date", "completion date", "timeline", "schedule"]
        },
        {
            "query": "How do I get started?",
            "description": "Beginner question",
            "similar_to": ["setup", "installation", "first steps", "getting started"]
        },
        {
            "query": "What are the system requirements?",
            "description": "Technical specifications",
            "similar_to": ["prerequisites", "dependencies", "requirements", "needed software"]
        },
        {
            "query": "How much does it cost?",
            "description": "Pricing question",
            "similar_to": ["price", "payment", "subscription", "fees"]
        },
        {
            "query": "Is there customer support?",
            "description": "Support inquiry",
            "similar_to": ["help", "assistance", "contact", "support team"]
        }
    ]
    
    print("🔍 Testing Semantic Search Capabilities")
    print("-" * 70)
    print()
    
    for i, test in enumerate(test_queries, 1):
        query = test["query"]
        description = test["description"]
        
        print(f"Test {i}: {description}")
        print(f"Query: \"{query}\"")
        print(f"Should match: {', '.join(test['similar_to'])}")
        print()
        
        try:
            # Generate embedding for query
            query_embedding = generate_embedding(query)
            
            # Search for similar chunks
            # Note: You'll need a user_id - using a dummy UUID for testing
            # In production, use actual user IDs
            result = supabase.rpc(
                'match_file_chunks',
                {
                    'query_embedding': query_embedding,
                    'match_count': 3,
                    'user_uuid': '00000000-0000-0000-0000-000000000000'  # Dummy UUID
                }
            ).execute()
            
            if result.data and len(result.data) > 0:
                print(f"✅ Found {len(result.data)} matches:")
                for j, match in enumerate(result.data, 1):
                    similarity = match.get('similarity', 0)
                    content_preview = match.get('content', '')[:100]
                    print(f"   {j}. Similarity: {similarity:.4f}")
                    print(f"      Preview: {content_preview}...")
                print()
            else:
                print("⚠️  No matches found (this is normal if no documents uploaded)")
                print()
        
        except Exception as e:
            print(f"❌ Error during search: {e}")
            print()
    
    print("=" * 70)
    print("TEST COMPLETE")
    print("=" * 70)
    print()
    print("💡 Tips for better results:")
    print("   - Upload documents with relevant content")
    print("   - Try queries related to your document content")
    print("   - Semantic search understands context and synonyms")
    print("   - Higher similarity scores (closer to 1.0) = better matches")
    print()

if __name__ == "__main__":
    try:
        test_semantic_search()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Test failed: {e}")
