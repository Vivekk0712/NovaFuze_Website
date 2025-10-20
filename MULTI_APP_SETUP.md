# 🔄 Multi-App localStorage Isolation Setup

Complete guide for running multiple instances of your app without localStorage conflicts.

---

## 🎯 Problem Solved

When running multiple app instances (App1, App2, etc.) on the same domain, they share localStorage, causing:
- ❌ Mixed chat histories
- ❌ Data conflicts
- ❌ User confusion

**Solution:** App-specific localStorage keys using `VITE_APP_ID`

---

## ✅ What's Been Updated (Current App - NovaFuze)

### 1. Environment Variables
**File:** `NovaFuze_web/.env`
```env
VITE_APP_ID=novafuze-v1
```

### 2. ChatBot Component
**File:** `NovaFuze_web/src/components/ChatBot.tsx`
- ✅ Added `APP_ID` constant from environment
- ✅ Updated localStorage keys: `${APP_ID}_chatHistory_${user.uid}`
- ✅ Updated clear function to use app-specific keys

### 3. Storage Key Format
**Before:**
```
chatHistory_user123
```

**After:**
```
novafuze-v1_chatHistory_user123
```

---

## 🔧 Setup for Other App Instances

### For Each Additional App:

#### Step 1: Update .env
```bash
# In your other app's .env file
VITE_APP_ID=your-app-name-v1

# Examples:
# VITE_APP_ID=ai-assistant-v1
# VITE_APP_ID=chatbot-v2
# VITE_APP_ID=customer-support-v1
```

#### Step 2: Update ChatBot.tsx
Add this at the top of your ChatBot component:

```typescript
// App-specific identifier for localStorage isolation
const APP_ID = import.meta.env.VITE_APP_ID || 'default-app';
```

#### Step 3: Update localStorage Keys
Replace all instances of:
```typescript
// OLD
localStorage.getItem(`chatHistory_${user.uid}`)
localStorage.setItem(`chatHistory_${user.uid}`, data)
localStorage.removeItem(`chatHistory_${user.uid}`)
```

With:
```typescript
// NEW
const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
localStorage.getItem(storageKey)
localStorage.setItem(storageKey, data)
localStorage.removeItem(storageKey)
```

#### Step 4: Restart Development Server
```bash
npm run dev
```

---

## 📋 Quick Copy-Paste for Other Apps

### Complete ChatBot.tsx Changes

```typescript
import React, { useState, useEffect, useRef } from 'react';
// ... other imports

// ADD THIS LINE
const APP_ID = import.meta.env.VITE_APP_ID || 'default-app';

const ChatBot = ({ user, onToggleFullscreen, isFullscreen = false }: ChatBotProps) => {
  // ... state declarations

  // LOAD HISTORY - UPDATE THIS
  useEffect(() => {
    if (user?.uid) {
      const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
      const savedHistory = localStorage.getItem(storageKey);
      if (savedHistory) {
        try {
          setChatHistory(JSON.parse(savedHistory));
        } catch (error) {
          console.error('Error parsing saved chat history:', error);
        }
      }
    }
  }, [user?.uid]);

  // SAVE HISTORY - UPDATE THIS
  useEffect(() => {
    if (user?.uid && chatHistory.length > 0) {
      const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
      localStorage.setItem(storageKey, JSON.stringify(chatHistory));
    }
  }, [chatHistory, user?.uid]);

  // CLEAR HISTORY - UPDATE THIS
  const handleClearChat = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      try {
        setLoading(true);
        await clearChat();
        setChatHistory([]);
        if (user?.uid) {
          const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error('Error clearing chat history:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // ... rest of component
};
```

---

## 🗂️ App ID Naming Convention

Use descriptive, unique IDs for each app:

| App Type | Recommended ID | Storage Key Example |
|----------|---------------|---------------------|
| NovaFuze (current) | `novafuze-v1` | `novafuze-v1_chatHistory_user123` |
| AI Assistant | `ai-assistant-v1` | `ai-assistant-v1_chatHistory_user123` |
| Customer Support | `support-bot-v1` | `support-bot-v1_chatHistory_user123` |
| Internal Tool | `internal-v1` | `internal-v1_chatHistory_user123` |

**Rules:**
- Use lowercase with hyphens
- Include version number (v1, v2, etc.)
- Keep it short but descriptive
- No spaces or special characters

---

## 🧹 Cleanup Old localStorage Data

### Option 1: Browser Console (Manual)
Open browser console (F12) and run:

```javascript
// List all old chat history keys
Object.keys(localStorage)
  .filter(key => key.startsWith('chatHistory_') && !key.includes('_chatHistory_'))
  .forEach(key => console.log('Old key:', key));

// Remove old keys (after verifying above)
Object.keys(localStorage)
  .filter(key => key.startsWith('chatHistory_') && !key.includes('_chatHistory_'))
  .forEach(key => {
    console.log('Removing:', key);
    localStorage.removeItem(key);
  });
```

### Option 2: Add Cleanup Script to App
Add this to your app's initialization:

```typescript
// utils/cleanupOldStorage.ts
export const cleanupOldLocalStorage = () => {
  const oldKeys = Object.keys(localStorage).filter(
    key => key.startsWith('chatHistory_') && !key.includes('_chatHistory_')
  );
  
  if (oldKeys.length > 0) {
    console.log(`Cleaning up ${oldKeys.length} old localStorage keys...`);
    oldKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`Removed: ${key}`);
    });
  }
};

// Call once on app load
cleanupOldLocalStorage();
```

---

## 🔍 Verification

### Check Current Storage Keys
Open browser console (F12):

```javascript
// List all localStorage keys
Object.keys(localStorage).forEach(key => console.log(key));

// Filter chat history keys
Object.keys(localStorage)
  .filter(key => key.includes('chatHistory'))
  .forEach(key => console.log(key));
```

### Expected Output (After Setup)
```
novafuze-v1_chatHistory_user123
ai-assistant-v1_chatHistory_user456
support-bot-v1_chatHistory_user789
```

### Verify Isolation
1. Open App1 (novafuze-v1)
2. Send some messages
3. Open App2 (ai-assistant-v1) in another tab
4. Verify App2 has empty chat history
5. ✅ Success! Apps are isolated

---

## 🚨 Troubleshooting

### Issue 1: Still Seeing Mixed Data
**Cause:** Old localStorage keys not cleaned up  
**Solution:** Run cleanup script (see above)

### Issue 2: APP_ID is 'default-app'
**Cause:** .env not loaded or missing VITE_APP_ID  
**Solution:** 
1. Add `VITE_APP_ID=your-app-v1` to .env
2. Restart dev server: `npm run dev`

### Issue 3: Changes Not Applied
**Cause:** Browser cache or dev server not restarted  
**Solution:**
1. Stop dev server (Ctrl+C)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart: `npm run dev`

### Issue 4: localStorage Still Shared
**Cause:** Apps running on same domain without APP_ID  
**Solution:** Verify APP_ID is different in each app's .env

---

## 📊 Storage Structure

### Before (Shared)
```
localStorage
├── chatHistory_user123 (mixed data from all apps!)
├── chatHistory_user456 (mixed data from all apps!)
└── chatHistory_user789 (mixed data from all apps!)
```

### After (Isolated)
```
localStorage
├── novafuze-v1_chatHistory_user123 (App1 only)
├── novafuze-v1_chatHistory_user456 (App1 only)
├── ai-assistant-v1_chatHistory_user123 (App2 only)
├── ai-assistant-v1_chatHistory_user456 (App2 only)
├── support-bot-v1_chatHistory_user123 (App3 only)
└── support-bot-v1_chatHistory_user456 (App3 only)
```

---

## ✅ Checklist for Each App

- [ ] Add `VITE_APP_ID` to .env
- [ ] Add `VITE_APP_ID` to .env.example with documentation
- [ ] Update ChatBot.tsx with `APP_ID` constant
- [ ] Update localStorage.getItem() calls
- [ ] Update localStorage.setItem() calls
- [ ] Update localStorage.removeItem() calls
- [ ] Restart development server
- [ ] Test chat history isolation
- [ ] Clean up old localStorage keys
- [ ] Verify in browser console

---

## 🎯 Benefits

✅ **Complete Isolation** - Each app has its own data  
✅ **No Conflicts** - Apps don't interfere with each other  
✅ **Easy Management** - Clear which data belongs to which app  
✅ **Scalable** - Add unlimited app instances  
✅ **Debuggable** - Easy to identify issues  
✅ **Production Ready** - Works in all environments  

---

## 📝 Example: Setting Up 3 Apps

### App 1: NovaFuze (Current)
```env
# NovaFuze_web/.env
VITE_APP_ID=novafuze-v1
```

### App 2: AI Assistant
```env
# ai-assistant/.env
VITE_APP_ID=ai-assistant-v1
```

### App 3: Support Bot
```env
# support-bot/.env
VITE_APP_ID=support-bot-v1
```

**Result:**
- Each app has isolated localStorage
- No data mixing
- Easy to debug and maintain

---

## 🔐 Security Note

This isolation is for **convenience**, not security. localStorage is:
- ❌ Not encrypted
- ❌ Accessible via JavaScript
- ❌ Shared across same domain

For sensitive data, always use:
- ✅ Server-side storage
- ✅ Encrypted databases
- ✅ Secure authentication

---

**Your apps are now properly isolated! 🎉**
