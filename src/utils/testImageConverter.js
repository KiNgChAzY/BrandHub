/**
 * Test Utility for Image Converter
 * 
 * This file provides a simple way to test the image conversion functionality.
 * 
 * To use in browser console:
 * 1. Import the functions: import { convertImageFormat, downloadImage, getAvailableFormats } from './utils/imageConverter.js'
 * 2. Or use the test functions below in the browser console
 * 
 * Example test:
 *   testImageConversion('https://example.com/image.png', 'jpg')
 */

import { 
  convertImageFormat, 
  downloadImage, 
  isSVG, 
  getAvailableFormats,
  isConversionSupported 
} from './imageConverter.js';

/**
 * Test image format conversion
 * 
 * @param {string} imageUrl - URL of image to convert
 * @param {string} targetFormat - Target format (png, jpg, webp)
 * @param {string} testName - Optional name for the test
 */
export async function testImageConversion(imageUrl, targetFormat, testName = 'Test') {
  console.log(`\n🧪 ${testName}: Converting ${imageUrl} to ${targetFormat.toUpperCase()}`);
  
  try {
    const startTime = Date.now();
    
    // Convert image
    const blob = await convertImageFormat(imageUrl, targetFormat);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ Conversion successful!`);
    console.log(`   Format: ${targetFormat.toUpperCase()}`);
    console.log(`   Size: ${(blob.size / 1024).toFixed(2)} KB`);
    console.log(`   Duration: ${duration}s`);
    
    // Download the converted image
    const filename = `test-converted-${Date.now()}`;
    downloadImage(blob, filename, targetFormat);
    console.log(`   Download triggered: ${filename}.${targetFormat}`);
    
    return blob;
  } catch (error) {
    console.error(`❌ Conversion failed:`, error.message);
    
    // Provide helpful error message for CORS issues
    if (error.message.includes('CORS') || error.message.includes('Failed to load image')) {
      console.error(`\n💡 CORS Error Help:`);
      console.error(`   The image source doesn't allow cross-origin requests.`);
      console.error(`   Try using one of these CORS-enabled test images:`);
      console.error(`   - https://picsum.photos/400/300 (random image)`);
      console.error(`   - https://httpbin.org/image/png (test PNG)`);
      console.error(`   - Or use an image from your Firebase Storage`);
      console.error(`\n   Example: testImageConversion('https://picsum.photos/400/300', 'jpg')`);
    }
    
    throw error;
  }
}

/**
 * Test all available formats for an image
 * 
 * @param {string} imageUrl - URL of image to test
 * @param {string} fileType - MIME type of the source image
 */
export async function testAllFormats(imageUrl, fileType) {
  console.log(`\n🧪 Testing all formats for: ${imageUrl}`);
  console.log(`   Source type: ${fileType}`);
  
  const availableFormats = getAvailableFormats(fileType);
  console.log(`   Available formats: ${availableFormats.join(', ')}`);
  
  const results = [];
  
  for (const format of availableFormats) {
    if (format === 'original') {
      console.log(`\n   ⏭️  Skipping 'original' format (no conversion needed)`);
      continue;
    }
    
    try {
      const blob = await testImageConversion(imageUrl, format, `Format: ${format.toUpperCase()}`);
      results.push({ format, success: true, size: blob.size });
    } catch (error) {
      results.push({ format, success: false, error: error.message });
    }
    
    // Small delay between conversions
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n📊 Test Results Summary:`);
  results.forEach(result => {
    if (result.success) {
      console.log(`   ✅ ${result.format.toUpperCase()}: ${(result.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`   ❌ ${result.format.toUpperCase()}: ${result.error}`);
    }
  });
  
  return results;
}

/**
 * Test SVG detection
 * 
 * @param {string} fileType - MIME type
 * @param {string} fileUrl - File URL (optional)
 */
export function testSVGDetection(fileType, fileUrl = '') {
  console.log(`\n🧪 Testing SVG detection`);
  console.log(`   File type: ${fileType}`);
  console.log(`   File URL: ${fileUrl || 'N/A'}`);
  
  const isSVGFile = isSVG(fileType, fileUrl);
  console.log(`   Result: ${isSVGFile ? '✅ Is SVG' : '❌ Not SVG'}`);
  
  return isSVGFile;
}

/**
 * Test conversion support check
 * 
 * @param {string} sourceFormat - Source format
 * @param {string} targetFormat - Target format
 */
export function testConversionSupport(sourceFormat, targetFormat) {
  console.log(`\n🧪 Testing conversion support`);
  console.log(`   Source: ${sourceFormat}`);
  console.log(`   Target: ${targetFormat}`);
  
  const supported = isConversionSupported(sourceFormat, targetFormat);
  console.log(`   Result: ${supported ? '✅ Supported' : '❌ Not supported'}`);
  
  return supported;
}

// Make functions available globally for browser console testing
if (typeof window !== 'undefined') {
  window.testImageConversion = testImageConversion;
  window.testAllFormats = testAllFormats;
  window.testSVGDetection = testSVGDetection;
  window.testConversionSupport = testConversionSupport;
  
  console.log(`
📝 Image Converter Test Utilities Loaded!

Available functions in console:
  - testImageConversion(imageUrl, targetFormat, testName)
  - testAllFormats(imageUrl, fileType)
  - testSVGDetection(fileType, fileUrl)
  - testConversionSupport(sourceFormat, targetFormat)

Example usage:
  testImageConversion('https://example.com/image.png', 'jpg')
  testAllFormats('https://example.com/image.png', 'image/png')
  testSVGDetection('image/svg+xml', 'https://example.com/logo.svg')
  testConversionSupport('image/png', 'jpg')
  `);
}

