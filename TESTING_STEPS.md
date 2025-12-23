# Step-by-Step Testing Guide for Image Converter

## Step 1: Start the Development Server

1. Open your terminal/command prompt
2. Navigate to your project directory:
   ```bash
   cd C:\Users\chase\OneDrive\Desktop\BrandHub
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Wait for the server to start. You should see something like:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

## Step 2: Open Your Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to the URL shown in your terminal (usually `http://localhost:5173/`)
3. You should see your BrandHub application

## Step 3: Open Browser Console

**Option A: Using Keyboard Shortcut (Easiest)**
- Press `F12` on your keyboard
- OR press `Ctrl + Shift + I` (Windows/Linux)
- OR press `Cmd + Option + I` (Mac)

**Option B: Using Right-Click Menu**
1. Right-click anywhere on the page
2. Click "Inspect" or "Inspect Element"
3. Click on the "Console" tab at the top of the developer tools panel

**Option C: Using Browser Menu**
- Chrome/Edge: Menu (⋮) → More Tools → Developer Tools → Console tab
- Firefox: Menu (☰) → More Tools → Web Developer Tools → Console tab

## Step 4: Verify Test Functions Are Loaded

1. In the Console tab, you should see a message like:
   ```
   📝 Image Converter Test Utilities Loaded!
   
   Available functions in console:
     - testImageConversion(imageUrl, targetFormat, testName)
     - testAllFormats(imageUrl, fileType)
     - testSVGDetection(fileType, fileUrl)
     - testConversionSupport(sourceFormat, targetFormat)
   ```

2. If you don't see this message, type this in the console and press Enter:
   ```javascript
   typeof testImageConversion
   ```
   - If it says `"function"`, you're good to go!
   - If it says `"undefined"`, refresh the page (F5) and try again

## Step 5: Test Single Format Conversion

**Test 1: Convert PNG to JPG**

1. In the console, type (or copy/paste) this command:
   ```javascript
   testImageConversion('https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Test+Image', 'jpg', 'PNG to JPG Test')
   ```

2. Press `Enter`

3. You should see:
   - Console messages showing the conversion progress
   - A download should start automatically
   - The converted JPG file will download to your Downloads folder

**Test 2: Convert to WebP**

1. Type this in the console:
   ```javascript
   testImageConversion('https://via.placeholder.com/400x300/DC2626/FFFFFF?text=WebP+Test', 'webp', 'PNG to WebP Test')
   ```

2. Press `Enter`

3. Check the console for results and download

## Step 6: Test All Formats at Once

1. Type this in the console:
   ```javascript
   testAllFormats('https://via.placeholder.com/400x300/059669/FFFFFF?text=All+Formats', 'image/png')
   ```

2. Press `Enter`

3. This will:
   - Convert the image to PNG, JPG, and WebP
   - Show results for each format
   - Download each converted file
   - Display a summary at the end

## Step 7: Test SVG Detection

1. Test with a PNG (should return false):
   ```javascript
   testSVGDetection('image/png', 'https://example.com/image.png')
   ```

2. Press `Enter`

3. Test with an SVG (should return true):
   ```javascript
   testSVGDetection('image/svg+xml', 'https://example.com/logo.svg')
   ```

4. Press `Enter`

## Step 8: Test Conversion Support Check

1. Test if PNG can convert to JPG (should return true):
   ```javascript
   testConversionSupport('image/png', 'jpg')
   ```

2. Press `Enter`

3. Test if SVG can convert to PNG (should return false):
   ```javascript
   testConversionSupport('image/svg+xml', 'png')
   ```

4. Press `Enter`

## Step 9: Test with Your Own Images (Optional)

If you have images uploaded to your Firebase Storage:

1. Go to your Asset Page in the app
2. Find an asset and copy its URL
3. In the console, use that URL:
   ```javascript
   testImageConversion('YOUR_ASSET_URL_HERE', 'jpg', 'My Asset Test')
   ```

## What to Look For

### ✅ Success Indicators:
- Console shows: `✅ Conversion successful!`
- File size and duration are displayed
- Download starts automatically
- File appears in your Downloads folder

### ❌ Error Indicators:
- Console shows: `❌ Conversion failed: [error message]`
- No download occurs
- Error message explains what went wrong

## Common Issues & Solutions

### Issue: "testImageConversion is not defined"
**Solution:** 
- Refresh the page (F5)
- Make sure you're in development mode (`npm run dev`)
- Check that `src/utils/testImageConverter.js` exists

### Issue: "CORS error" or "Failed to load image"
**Solution:**
- Use placeholder images for testing (like the examples above)
- Make sure Firebase Storage CORS is configured for your own images
- Try a different image URL

### Issue: "Conversion failed: blob creation failed"
**Solution:**
- The image might be too large or corrupted
- Try a smaller image
- Check the image URL is accessible

### Issue: No download happens
**Solution:**
- Check your browser's download settings
- Some browsers block automatic downloads
- Check Downloads folder manually

## Expected Console Output Example

When you run `testImageConversion`, you should see something like:

```
🧪 PNG to JPG Test: Converting https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Test+Image to JPG
✅ Conversion successful!
   Format: JPG
   Size: 45.23 KB
   Duration: 0.85s
   Download triggered: test-converted-1234567890.jpg
```

## Next Steps

Once testing is complete:
- You can remove `src/utils/testImageConverter.js` if you don't need it anymore
- You can remove `TESTING_STEPS.md` and `TESTING_IMAGE_CONVERTER.md`
- The main `imageConverter.js` utility will still work in your app

## Quick Reference

**Available Test Functions:**
- `testImageConversion(url, format, name)` - Convert one format
- `testAllFormats(url, fileType)` - Test all formats
- `testSVGDetection(fileType, fileUrl)` - Check if SVG
- `testConversionSupport(source, target)` - Check if conversion supported

**Example URLs for Testing:**
- `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Test` - Blue placeholder
- `https://via.placeholder.com/800x600/DC2626/FFFFFF?text=Large` - Red placeholder
- `https://picsum.photos/400/300` - Random image

