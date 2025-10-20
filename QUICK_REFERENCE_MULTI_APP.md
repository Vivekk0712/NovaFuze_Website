# 🚀 Quick Reference: Multi-App localStorage Setup

## ⚡ 30-Second Setup for New Apps

### 1. Add to .env
```env
VITE_APP_ID=your-app-name-v1
```

### 2. Update ChatBot.tsx (Top of file)
```typescript
const APP_ID = import.meta.env.VITE_APP_ID || 'default-app';
```

### 3. Update localStorage calls
```typescript
// Replace this pattern:
localStorage.getItem(`chatHistory_${user.uid}`)

// With this:
const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
localStorage.getItem(storageKey)
```

### 4. Restart
```bash
npm run dev
```

---

## 🎯 App ID Examples

| App | VITE_APP_ID | Storage Key |
|-----|-------------|-------------|
| NovaFuze | `novafuze-v1` | `novafuze-v1_chatHistory_user123` |
| AI Assistant | `ai-assistant-v1` | `ai-assistant-v1_chatHistory_user123` |
| Support Bot | `support-bot-v1` | `support-bot-v1_chatHistory_user123` |
| Internal Tool | `internal-v1` | `internal-v1_chatHistory_user123` |

---

## 🧹 Cleanup Old Data

### Browser Console (F12)
```javascript
// Check stats
storageUtils.stats()

// Clean up old keys
storageUtils.cleanup()

// Verify
storageUtils.list()
```

---

## ✅ Verification

### Check .env
```bash
cat .env | grep VITE_APP_ID
```

### Check Console
Look for:
```
DEBUG: Loading from localStorage [your-app-v1_chatHistory_user123]
```

### Check localStorage (F12)
```javascript
Object.keys(localStorage).filter(k => k.includes('chatHistory'))
```

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| APP_ID is 'default-app' | Add `VITE_APP_ID` to .env, restart server |
| Still seeing old keys | Run `storageUtils.cleanup()` in console |
| Changes not working | Clear cache, restart server |
| Apps sharing data | Check each app has unique `VITE_APP_ID` |

---

## 📋 Complete Checklist

- [ ] Add `VITE_APP_ID` to .env
- [ ] Add `const APP_ID = ...` to ChatBot.tsx
- [ ] Update `localStorage.getItem()`
- [ ] Update `localStorage.setItem()`
- [ ] Update `localStorage.removeItem()`
- [ ] Restart dev server
- [ ] Test in browser
- [ ] Clean up old keys
- [ ] Verify isolation

---

## 📚 Full Documentation

- `MULTI_APP_SETUP.md` - Complete guide
- `LOCALSTORAGE_ISOLATION_COMPLETE.md` - Implementation summary
- `NovaFuze_web/src/utils/cleanupOldStorage.ts` - Utility functions

---

**That's it! Your app is now isolated. 🎉**
