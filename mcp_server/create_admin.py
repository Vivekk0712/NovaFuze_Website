#!/usr/bin/env python3
"""
Script to create an admin user for the system.
Run this script to create the first admin user.
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from tools.admin_tools import create_admin_user
from supabase_client import init_supabase

def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize Supabase connection
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file")
        sys.exit(1)
    
    print(f"Connecting to Supabase: {supabase_url}")
    if not init_supabase(supabase_url, supabase_key):
        print("ERROR: Failed to initialize Supabase connection")
        sys.exit(1)
    
    print("=== Admin User Creation ===")
    print("Create a new admin user for the system.")
    print()
    
    # Get admin details
    email = input("Enter admin email: ").strip()
    if not email:
        print("Error: Email is required")
        sys.exit(1)
    
    password = input("Enter admin password: ").strip()
    if not password:
        print("Error: Password is required")
        sys.exit(1)
    
    name = input("Enter admin name: ").strip()
    if not name:
        name = email.split('@')[0]  # Use email prefix as name
    
    print()
    print("Creating admin user...")
    
    # Create admin user
    result = create_admin_user(email, password, name)
    
    if result['success']:
        print("✅ Admin user created successfully!")
        print(f"   Email: {result['email']}")
        print(f"   Name: {result['name']}")
        print(f"   ID: {result['admin_id']}")
        print()
        print("You can now login to the admin dashboard with these credentials.")
    else:
        print("❌ Failed to create admin user:")
        print(f"   Error: {result['error']}")
        sys.exit(1)

if __name__ == "__main__":
    main()
