# Testing Image Converter Utility

## Quick Test Instructions

### Option 1: Browser Console Testing (Recommended)

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12 or Right-click → Inspect → Console)

3. **Import the test utilities:**
   ```javascript
   // The test utilities are automatically loaded and available in the console
   // Just use the functions directly:
   ```

4. **Test single format conversion:**
   ```javascript
   // Replace with an actual image URL from your Firebase Storage or any public image
   testImageConversion('https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Test+Image', 'jpg', 'Test JPG Conversion')
   ```

5. **Test all formats:**
   ```javascript
   testAllFormats('https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Test+Image', 'image/png')
   ```

6. **Test SVG detection:**
   ```javascript
   testSVGDetection('image/svg+xml', 'https://example.com/logo.svg')
   testSVGDetection('image/png', 'https://example.com/image.png') // Should return false
   ```

7. **Test conversion support:**
   ```javascript
   testConversionSupport('image/png', 'jpg') // Should return true
   testConversionSupport('image/svg+xml', 'png') // Should return false (SVG can't convert)
   ```

### Option 2: Test with Real Assets from Your App

1. **Upload an image asset** through the Upload Asset page
2. **Get the asset URL** from Firebase Storage or from the Asset Page
3. **Open browser console** on the Asset Page
4. **Test conversion:**
   ```javascript
   // Use an actual asset URL from your app
   const assetUrl = 'https://firebasestorage.googleapis.com/...'; // Your asset URL
   testImageConversion(assetUrl, 'webp', 'Convert to WebP')
   ```

### Option 3: Create a Test Page (Optional)

If you want a dedicated test page, you can create `src/screens/TestImageConverter.jsx`:

```jsx
import React, { useState } from 'react';
import { testImageConversion, testAllFormats } from '../utils/testImageConverter';

export default function TestImageConverter() {
  const [imageUrl, setImageUrl] = useState('');
  const [fileType, setFileType] = useState('image/png');
  const [loading, setLoading] = useState(false);

  async function handleTest() {
    setLoading(true);
    try {
      await testAllFormats(imageUrl, fileType);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Converter Test</h1>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input w-full"
            placeholder="https://example.com/image.png"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">File Type</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="input w-full"
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPG</option>
            <option value="image/webp">WebP</option>
            <option value="image/svg+xml">SVG</option>
          </select>
        </div>
        <button
          onClick={handleTest}
          disabled={loading || !imageUrl}
          className="btn-primary"
        >
          {loading ? 'Testing...' : 'Test All Formats'}
        </button>
      </div>
      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          Check the browser console for detailed test results.
        </p>
      </div>
    </div>
  );
}
```

Then add a route in `App.jsx` (temporary, for testing only).

## What to Test

### ✅ Basic Functionality
- [ ] Convert PNG to JPG
- [ ] Convert PNG to WebP
- [ ] Convert JPG to PNG
- [ ] Convert JPG to WebP
- [ ] Download works correctly

### ✅ Quality Settings
- [ ] JPG quality is 0.92 (92%)
- [ ] WebP quality is 0.85 (85%)
- [ ] PNG is lossless

### ✅ SVG Handling
- [ ] SVG detection works correctly
- [ ] SVG format only shows for SVG sources
- [ ] Raster images don't show SVG option

### ✅ Error Handling
- [ ] Invalid URL shows error
- [ ] CORS errors are handled
- [ ] Large images show warning
- [ ] Conversion failures are caught

### ✅ File Size Limits
- [ ] 10MB limit is enforced
- [ ] Warnings appear for large images

## Expected Results

- **Conversion time:** Should be under 2-3 seconds for typical images
- **File sizes:** 
  - PNG: Usually largest (lossless)
  - JPG: Smaller than PNG (lossy, 92% quality)
  - WebP: Usually smallest (lossy, 85% quality)
- **Downloads:** Files should download with correct names and formats

## Troubleshooting

### CORS Errors
If you see CORS errors:
- Make sure Firebase Storage CORS is configured
- Test with images from the same origin first
- Use placeholder images for initial testing

### Large File Warnings
If you see size warnings:
- This is expected for very large images
- Conversion may still work, but performance may be slower

### Conversion Failures
If conversion fails:
- Check browser console for detailed error
- Verify image URL is accessible
- Check that image format is supported
- Ensure image is not corrupted

## Cleanup

After testing, you can:
- Remove `src/utils/testImageConverter.js` if not needed
- Remove this testing guide
- Remove any test routes/pages created

