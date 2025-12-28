# Quick Guide: Upload an Asset First

Since you don't have any assets yet, you need to upload one before testing the format service.

## Step 1: Make sure you're logged in as Admin

1. Go to `http://localhost:5173/`
2. If you're not logged in, click "Login" and sign in
3. **Important:** Make sure your account has the "admin" role (only admins can upload assets)

## Step 2: Go to Upload Asset Page

1. In the sidebar, click **"Upload Asset"** or go to `/upload`
2. You should see the upload form

## Step 3: Fill out the form

1. **Asset Name:** Enter a name (e.g., "Test Logo")
2. **Category:** Select a category (e.g., "Logo")
3. **File:** Click "Choose File" and select an image file
   - Supported: PNG, JPG, JPEG, WebP, SVG
   - Max size: 10MB
   - **Tip:** Use any image file from your computer
4. **Description (optional):** Add a description if you want
5. **Usage Rules (optional):** You can skip these for testing

## Step 4: Upload

1. Click the **"Upload Asset"** button
2. Wait for upload progress (should show 0-100%)
3. You should see a success message when done

## Step 5: Verify Upload

1. Go to the **Asset Page** (click "Asset Page" in sidebar)
2. You should see your uploaded asset in the grid

## Step 6: Now Test Format Service

1. Open browser console (F12)
2. Run:
   ```javascript
   listAssets()
   ```
3. You should now see your asset with an ID
4. Copy the ID and test format generation!

## Quick Test After Upload

Once you have an asset, use this:

```javascript
// List assets and see the ID
listAssets()

// Then generate a format (replace YOUR_ASSET_ID)
testGenerateFormat('YOUR_ASSET_ID', 'webp', 'First Format Test')

// Or use the automated test
testCompleteWorkflow()
```

## Troubleshooting

### "Only admins can upload assets" error
- Make sure you're logged in with an admin account
- Check your role in Firestore `users` collection

### Upload fails
- Check file size (max 10MB)
- Check file type (should be an image)
- Check browser console for errors
- Make sure Firebase is configured

### Still can't see assets after upload
- Refresh the page
- Check Firestore console to see if document was created
- Try `listAssets()` again in console

