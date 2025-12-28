# Upload Stuck at 0% - Troubleshooting Guide

## Quick Checks

### Step 1: Check Browser Console for Errors

1. Open browser console (F12)
2. Try uploading again
3. Look for error messages in the console
4. Common errors:
   - "Firebase Storage not initialized"
   - "Permission denied" or "403 Forbidden"
   - "CORS error"
   - Network errors

### Step 2: Check Firebase Configuration

1. Check if `.env.local` exists in your project root
2. Verify it has all required Firebase variables:
   ```
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Make sure `VITE_FIREBASE_STORAGE_BUCKET` is set correctly

### Step 3: Check Firebase Storage Rules

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project
3. Go to **Storage** → **Rules**
4. Check if rules allow uploads

**Temporary test rule (for development only):**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note:** This allows any authenticated user to read/write. Make it more restrictive for production.

### Step 4: Check if Firebase is Initialized

In browser console, type:
```javascript
// Check if Firebase is configured
console.log('Firebase configured:', typeof window !== 'undefined' && window.firebase)
```

Or check the network tab:
1. Press F12
2. Go to **Network** tab
3. Try uploading
4. Look for requests to Firebase Storage
5. Check if they're failing (red) or pending

### Step 5: Check File Size and Type

- File must be under 10MB
- Should be a valid image file (PNG, JPG, WebP, etc.)
- Try with a small test image first (< 1MB)

### Step 6: Verify Authentication

1. Make sure you're logged in
2. Check if your user has admin role in Firestore
3. In console, check:
   ```javascript
   // Should show your user
   firebase.auth().currentUser
   ```

## Common Issues and Solutions

### Issue: "Permission denied" or 403 error

**Solution:**
- Check Firebase Storage rules (Step 3 above)
- Make sure you're authenticated
- Verify your user role in Firestore

### Issue: "Storage bucket not found"

**Solution:**
- Check `.env.local` has correct `VITE_FIREBASE_STORAGE_BUCKET`
- Format should be: `your-project-id.appspot.com`
- Restart dev server after changing `.env.local`

### Issue: Network/CORS errors

**Solution:**
- Check internet connection
- Try refreshing the page
- Check Firebase Console for service status

### Issue: Upload starts but never progresses

**Solution:**
- Check browser network tab for pending requests
- Try a smaller file (< 1MB)
- Check Firebase Storage quota/limits

## Quick Diagnostic Commands

Run these in browser console to check setup:

```javascript
// 1. Check if Firebase is configured
import { storage } from './config/firebase.js'
console.log('Storage:', storage)

// 2. Check current user
// (You'd need to access auth from your app context)

// 3. Test Firebase Storage connection
import { ref } from 'firebase/storage'
const testRef = ref(storage, 'test/test.txt')
console.log('Test ref:', testRef)
```

## Next Steps

1. **Check console for specific error messages** - This will tell us exactly what's wrong
2. **Check Firebase Storage rules** - Most common issue
3. **Verify `.env.local` configuration** - Make sure Storage bucket is set
4. **Try a small test file** - Rules out file size/type issues

## What to Share for Help

If still stuck, share:
1. Browser console error messages (F12 → Console tab)
2. Network tab errors (F12 → Network tab → look for failed requests)
3. Firebase Storage rules (from Firebase Console)
4. Whether `.env.local` has `VITE_FIREBASE_STORAGE_BUCKET` set

