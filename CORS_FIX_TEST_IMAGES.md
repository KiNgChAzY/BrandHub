# CORS-Friendly Test Images

The placeholder service (`via.placeholder.com`) doesn't support CORS, which blocks image conversion in the browser. Use these CORS-enabled alternatives instead:

## ✅ Working Test Image URLs

### Option 1: Picsum Photos (Random Images)
```javascript
// Random image - different each time
testImageConversion('https://picsum.photos/400/300', 'jpg', 'Picsum Test')

// Specific image by ID
testImageConversion('https://picsum.photos/id/237/400/300', 'jpg', 'Dog Image')
```

### Option 2: HTTPBin (Test Images)
```javascript
// PNG test image
testImageConversion('https://httpbin.org/image/png', 'jpg', 'HTTPBin PNG to JPG')

// JPEG test image  
testImageConversion('https://httpbin.org/image/jpeg', 'png', 'HTTPBin JPG to PNG')

// WebP test image
testImageConversion('https://httpbin.org/image/webp', 'jpg', 'HTTPBin WebP to JPG')
```

### Option 3: JSONPlaceholder (Simple Test)
```javascript
// Small test image
testImageConversion('https://jsonplaceholder.typicode.com/photos/1', 'jpg', 'JSONPlaceholder Test')
```

### Option 4: Use Your Own Firebase Storage Images
```javascript
// Get URL from your Asset Page, then:
testImageConversion('YOUR_FIREBASE_STORAGE_URL_HERE', 'webp', 'My Asset Test')
```

## Quick Test Commands (Copy & Paste)

**Test 1 - Convert Picsum image to JPG:**
```javascript
testImageConversion('https://picsum.photos/400/300', 'jpg', 'Picsum JPG Test')
```

**Test 2 - Convert HTTPBin PNG to WebP:**
```javascript
testImageConversion('https://httpbin.org/image/png', 'webp', 'PNG to WebP Test')
```

**Test 3 - Test all formats:**
```javascript
testAllFormats('https://picsum.photos/400/300', 'image/jpeg')
```

## Why CORS Matters

- Browser security requires CORS headers for cross-origin image loading
- Canvas API needs CORS to read pixel data from external images
- Firebase Storage images work because they have CORS configured
- Public image services like Picsum and HTTPBin support CORS

## Recommended Test Sequence

1. **Start with Picsum (easiest):**
   ```javascript
   testImageConversion('https://picsum.photos/400/300', 'jpg', 'Quick Test')
   ```

2. **Test all formats:**
   ```javascript
   testAllFormats('https://picsum.photos/400/300', 'image/jpeg')
   ```

3. **Test with your own assets:**
   - Upload an image through your app
   - Copy the Firebase Storage URL
   - Use that URL in the test function

