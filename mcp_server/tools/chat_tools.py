from supabase_client import get_or_create_user, get_recent_messages, store_message as supabase_store_message

def get_chat_history(firebase_uid: str, limit: int = 10):
    """
    Gets the chat history for a given user.
    """
    user = get_or_create_user(firebase_uid)
    return get_recent_messages(user['id'], limit)

def store_message(firebase_uid: str, role: str, content: str):
    """
    Stores a message in the database.
    """
    user = get_or_create_user(firebase_uid)
    return supabase_store_message(user['id'], role, content)
