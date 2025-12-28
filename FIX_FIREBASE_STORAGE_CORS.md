# Fix Firebase Storage CORS Error (404)

The error shows:
- `CORS Preflight Did Not Succeed` 
- `Status code: 404`
- URL: `firebasestorage.googleapis.com/v0/b/brandhub-ff726.firebasestorage.app/...`

This means Firebase Storage either:
1. Doesn't have CORS configured
2. The bucket isn't accessible
3. Storage bucket name in .env.local is incorrect

## Solution 1: Configure Firebase Storage CORS (Required)

Firebase Storage needs CORS configuration to allow uploads from your localhost.

### Step 1: Create a CORS configuration file

1. Create a new file in your project root called `cors.json`:

```json
[
  {
    "origin": ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Authorization"]
  }
]
```

### Step 2: Install gcloud CLI (if not installed)

1. Download from: https://cloud.google.com/sdk/docs/install
2. Or use Firebase CLI (if you have it)

### Step 3: Apply CORS configuration

**Option A: Using gcloud CLI**

1. Open terminal/command prompt
2. Authenticate:
   ```bash
   gcloud auth login
   ```
3. Set your project:
   ```bash
   gcloud config set project brandhub-ff726
   ```
4. Apply CORS:
   ```bash
   gsutil cors set cors.json gs://brandhub-ff726.firebasestorage.app
   ```

**Option B: Using Firebase Console (Easier)**

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `brandhub-ff726`
3. Go to **Storage** → **Files** tab
4. Check if Storage is enabled
5. If Storage isn't enabled, click "Get Started"
6. After Storage is enabled, CORS should work better

**Option C: Use Firebase CLI (Recommended)**

If you have Firebase CLI installed:

1. Install Firebase CLI (if not installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Set project:
   ```bash
   firebase use brandhub-ff726
   ```

4. Apply CORS using gsutil (comes with Firebase CLI):
   ```bash
   gsutil cors set cors.json gs://brandhub-ff726.firebasestorage.app
   ```

## Solution 2: Verify Storage Bucket Name

1. Go to Firebase Console → Storage
2. Look at the bucket name at the top
3. It should be: `brandhub-ff726.firebasestorage.app` or `brandhub-ff726.appspot.com`
4. Check your `.env.local` file:

```env
VITE_FIREBASE_STORAGE_BUCKET=brandhub-ff726.firebasestorage.app
```

Or if it's the older format:
```env
VITE_FIREBASE_STORAGE_BUCKET=brandhub-ff726.appspot.com
```

5. **Restart your dev server** after changing `.env.local`

## Solution 3: Enable Firebase Storage (If Not Enabled)

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: `brandhub-ff726`
3. Click **Storage** in left menu
4. If you see "Get Started", click it
5. Choose "Start in test mode" (for development)
6. Select a location (choose closest to you)
7. Click "Done"

## Solution 4: Check Storage Rules

1. Go to Firebase Console → Storage → Rules
2. Make sure rules allow uploads:

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

3. Click "Publish"

## Quick Fix (Try This First)

The easiest fix is usually to enable Storage and set rules:

1. **Enable Storage** (if not enabled):
   - Firebase Console → Storage → Get Started
   - Choose test mode
   - Select location

2. **Set Storage Rules**:
   - Firebase Console → Storage → Rules
   - Use the rules above
   - Click Publish

3. **Restart dev server**:
   ```bash
   # Stop (Ctrl+C) and restart
   npm run dev
   ```

4. **Try uploading again**

## Verify It's Fixed

After applying fixes:

1. Refresh your app page
2. Try uploading again
3. Check console - should see upload progress (not stuck at 0%)
4. Should see successful upload

## Still Not Working?

If still getting 404 errors:

1. **Verify bucket name** in Firebase Console matches `.env.local`
2. **Check Storage is actually enabled** (not just created)
3. **Try a different browser** (sometimes cache issues)
4. **Clear browser cache** and try again
5. **Check Firebase project status** - make sure billing is enabled (if required for your plan)

## Alternative: Use Appspot.com Bucket

If the `.firebasestorage.app` format isn't working, try using the classic bucket name:

In `.env.local`, change:
```env
VITE_FIREBASE_STORAGE_BUCKET=brandhub-ff726.appspot.com
```

Then restart dev server.

