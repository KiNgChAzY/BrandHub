# Step-by-Step Testing Guide for Format Service

## Prerequisites

1. **Firebase must be configured** (you should have assets in Firestore)
2. **At least one image asset uploaded** through the Upload Asset page
3. **Dev server running** (`npm run dev`)

## Step 1: Start the Development Server

1. Open your terminal
2. Navigate to your project:
   ```bash
   cd C:\Users\chase\OneDrive\Desktop\BrandHub
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Wait for it to start (usually `http://localhost:5173/`)

## Step 2: Open Your Browser

1. Open your browser (Chrome, Firefox, Edge, etc.)
2. Go to `http://localhost:5173/`
3. You should see your BrandHub app

## Step 3: Open Browser Console

Press `F12` on your keyboard, then click the **Console** tab.

## Step 4: Verify Test Functions Are Loaded

You should see a message like:
```
📝 Format Service Test Utilities Loaded!

Available functions in console:
  - listAssets(limit)
  - testGenerateFormat(assetId, format, testName)
  ...
```

If you don't see it, refresh the page (F5).

## Step 5: List Your Assets (Find Asset IDs)

**Test 1: List Assets**

1. In the console, type:
   ```javascript
   listAssets()
   ```
2. Press `Enter`

3. You should see output like:
   ```
   ✅ Found 3 asset(s). Showing first 3:
      1. ID: abc123xyz
         Name: Company Logo
         Category: logo
         File Type: image/png
         Is Image: ✅ Yes
   ```

4. **Copy one of the asset IDs** (the ID is the long string like `abc123xyz`)

**Important:** Make sure you pick an asset that is an image (File Type should include "image")

## Step 6: Test Format Generation

**Test 2: Generate WebP Format**

1. Replace `YOUR_ASSET_ID` with the asset ID you copied:
   ```javascript
   testGenerateFormat('YOUR_ASSET_ID', 'webp', 'My First Format Test')
   ```

2. Example (using actual ID):
   ```javascript
   testGenerateFormat('abc123xyz', 'webp', 'My First Format Test')
   ```

3. Press `Enter`

4. **What should happen:**
   - Console shows: "Generating WEBP format..."
   - Image conversion happens (may take 1-3 seconds)
   - File is uploaded to Firebase Storage
   - Firestore is updated with format info
   - Console shows: "✅ Format generation successful!"
   - Shows URL, file size, and duration

5. **Expected output:**
   ```
   ✅ Format generation successful!
      Format: WEBP
      URL: https://firebasestorage.googleapis.com/...
      Duration: 2.15s
      File size: 45.23 KB
   ```

## Step 7: Check Format Info

**Test 3: Get Format Information**

1. Use the same asset ID:
   ```javascript
   testGetFormatInfo('YOUR_ASSET_ID', 'webp')
   ```

2. Press `Enter`

3. Should show format details including URL and file size

## Step 8: Test Cache (Second Request Should Be Fast)

**Test 4: Generate Same Format Again (Should Use Cache)**

1. Generate the same format again:
   ```javascript
   testGenerateFormat('YOUR_ASSET_ID', 'webp', 'Cached Test (Should be Fast)')
   ```

2. Press `Enter`

3. **This time should be MUCH faster** (< 0.5 seconds) because it uses the cached version
   - Should show: "Format webp found in cache"
   - Duration should be very short

## Step 9: Generate Different Formats

**Test 5: Generate PNG Format**

```javascript
testGenerateFormat('YOUR_ASSET_ID', 'png', 'PNG Format Test')
```

**Test 6: Generate JPG Format**

```javascript
testGenerateFormat('YOUR_ASSET_ID', 'jpg', 'JPG Format Test')
```

## Step 10: View All Available Formats

**Test 7: Get All Formats**

```javascript
testGetAllFormats('YOUR_ASSET_ID')
```

Should show all formats (original, png, jpg, webp) with their URLs and sizes.

## Step 11: Complete Test Workflow (Easiest Method)

**Test 8: Complete Automated Test**

This will automatically:
1. Find an image asset
2. Check current formats
3. Generate a format
4. Verify it's cached

```javascript
testCompleteWorkflow()
```

Or specify an asset ID and format:
```javascript
testCompleteWorkflow('YOUR_ASSET_ID', 'webp')
```

## What to Look For

### ✅ Success Indicators:
- Format generation completes successfully
- File size is displayed
- URL is a valid Firebase Storage URL
- Second generation is much faster (cache working)
- Formats appear in `getAllFormats()`

### ❌ Error Indicators:
- "Asset with ID ... not found" - Asset ID is wrong
- "Original file URL not found" - Asset has no fileUrl
- "Cannot convert SVG to raster format" - Trying to convert SVG to PNG/JPG
- "Firebase not configured" - Firebase not set up
- CORS errors - Image source doesn't allow cross-origin

## Troubleshooting

### Issue: "No assets found"
**Solution:**
- Upload an image asset through the Upload Asset page first
- Make sure you're logged in as admin
- Refresh the page and try `listAssets()` again

### Issue: "Asset not found"
**Solution:**
- Make sure you're using the correct asset ID
- Run `listAssets()` again to get the correct ID
- Asset ID should be a long string, not the asset name

### Issue: "Cannot convert SVG to raster format"
**Solution:**
- SVG files can only be downloaded as SVG
- Pick a raster image (PNG, JPG) for testing format conversion
- Use `listAssets()` to find image assets

### Issue: Format generation is slow every time
**Solution:**
- First generation is expected to be slow (1-3 seconds)
- Second generation should be fast (< 0.5s) if cache is working
- If second generation is also slow, check Firestore to see if format was saved

### Issue: "Firebase not configured"
**Solution:**
- Make sure `.env.local` has Firebase credentials
- Restart the dev server
- Check browser console for Firebase initialization errors

## Quick Reference Commands

```javascript
// Find assets
listAssets()

// Generate format
testGenerateFormat('ASSET_ID', 'webp', 'Test Name')

// Check format info
testGetFormatInfo('ASSET_ID', 'webp')

// Check if format available
testIsFormatAvailable('ASSET_ID', 'webp')

// Get all formats
testGetAllFormats('ASSET_ID')

// Complete automated test
testCompleteWorkflow()
```

## Next Steps

After testing:
1. ✅ Verify formats are generated correctly
2. ✅ Verify cache works (second request is fast)
3. ✅ Verify Firestore has `availableFormats` field updated
4. ✅ Verify Firebase Storage has files in `assets/{category}/{assetId}/formats/` path
5. ✅ Check file sizes are stored in Firestore

Once all tests pass, you're ready for Step 3!

