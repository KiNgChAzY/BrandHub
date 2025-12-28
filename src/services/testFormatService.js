/**
 * Test Utility for Format Service
 * 
 * Provides functions to test the format service functionality.
 * Use these in the browser console after loading the app.
 */

import { 
  generateFormat, 
  getFormatInfo, 
  isFormatAvailable,
  getAllAvailableFormats 
} from './formatService.js';
import { db } from '../config/firebase';
import { collection, getDocs, limit } from 'firebase/firestore';

/**
 * Test format generation for an asset
 * 
 * @param {string} assetId - Asset document ID
 * @param {string} targetFormat - Format to generate (png, jpg, webp)
 * @param {string} testName - Optional test name
 */
export async function testGenerateFormat(assetId, targetFormat, testName = 'Test') {
  console.log(`\n🧪 ${testName}: Generating ${targetFormat.toUpperCase()} format for asset ${assetId}`);
  
  try {
    const startTime = Date.now();
    
    // Generate format
    const url = await generateFormat(assetId, targetFormat);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ Format generation successful!`);
    console.log(`   Format: ${targetFormat.toUpperCase()}`);
    console.log(`   URL: ${url}`);
    console.log(`   Duration: ${duration}s`);
    
    // Get format info to show file size
    const formatInfo = await getFormatInfo(assetId, targetFormat);
    if (formatInfo && formatInfo.size) {
      console.log(`   File size: ${(formatInfo.size / 1024).toFixed(2)} KB`);
    }
    
    return url;
  } catch (error) {
    console.error(`❌ Format generation failed:`, error.message);
    console.error(`   Full error:`, error);
    throw error;
  }
}

/**
 * Test format info retrieval
 * 
 * @param {string} assetId - Asset document ID
 * @param {string} format - Format to check
 */
export async function testGetFormatInfo(assetId, format) {
  console.log(`\n🧪 Getting format info for ${format.toUpperCase()} format of asset ${assetId}`);
  
  try {
    const formatInfo = await getFormatInfo(assetId, format);
    
    if (formatInfo) {
      console.log(`✅ Format info found:`);
      console.log(`   URL: ${formatInfo.url}`);
      console.log(`   Format: ${formatInfo.format}`);
      if (formatInfo.size) {
        console.log(`   Size: ${(formatInfo.size / 1024).toFixed(2)} KB`);
      }
      if (formatInfo.generatedAt) {
        const date = formatInfo.generatedAt.toDate ? formatInfo.generatedAt.toDate() : new Date(formatInfo.generatedAt);
        console.log(`   Generated: ${date.toLocaleString()}`);
      }
    } else {
      console.log(`❌ Format ${format} not available for this asset`);
    }
    
    return formatInfo;
  } catch (error) {
    console.error(`❌ Error getting format info:`, error.message);
    throw error;
  }
}

/**
 * Test if format is available
 * 
 * @param {string} assetId - Asset document ID
 * @param {string} format - Format to check
 */
export async function testIsFormatAvailable(assetId, format) {
  console.log(`\n🧪 Checking if ${format.toUpperCase()} format is available for asset ${assetId}`);
  
  try {
    const isAvailable = await isFormatAvailable(assetId, format);
    console.log(`   Result: ${isAvailable ? '✅ Available' : '❌ Not available'}`);
    return isAvailable;
  } catch (error) {
    console.error(`❌ Error checking format availability:`, error.message);
    throw error;
  }
}

/**
 * Test getting all available formats
 * 
 * @param {string} assetId - Asset document ID
 */
export async function testGetAllFormats(assetId) {
  console.log(`\n🧪 Getting all available formats for asset ${assetId}`);
  
  try {
    const formats = await getAllAvailableFormats(assetId);
    
    console.log(`✅ Available formats:`);
    Object.keys(formats).forEach(formatKey => {
      const formatInfo = formats[formatKey];
      console.log(`   ${formatKey.toUpperCase()}:`);
      console.log(`     URL: ${formatInfo.url}`);
      if (formatInfo.size) {
        console.log(`     Size: ${(formatInfo.size / 1024).toFixed(2)} KB`);
      }
    });
    
    return formats;
  } catch (error) {
    console.error(`❌ Error getting all formats:`, error.message);
    throw error;
  }
}

/**
 * List assets from Firestore (helper to find asset IDs)
 * 
 * @param {number} limitCount - Maximum number of assets to list
 */
export async function listAssets(limitCount = 5) {
  console.log(`\n🧪 Listing up to ${limitCount} assets from Firestore`);
  
  if (!db) {
    console.error(`❌ Firebase not configured`);
    return [];
  }
  
  try {
    const assetsRef = collection(db, 'assets');
    const snapshot = await getDocs(assetsRef);
    
    if (snapshot.empty) {
      console.log(`   No assets found in Firestore`);
      console.log(`   💡 Tip: Upload an asset first through the Upload Asset page`);
      return [];
    }
    
    const assets = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      assets.push({
        id: doc.id,
        name: data.name || 'Unnamed',
        category: data.category || 'unknown',
        fileType: data.fileType || 'unknown',
      });
    });
    
    // Limit results
    const limitedAssets = assets.slice(0, limitCount);
    
    console.log(`✅ Found ${assets.length} asset(s). Showing first ${limitedAssets.length}:`);
    limitedAssets.forEach((asset, index) => {
      console.log(`   ${index + 1}. ID: ${asset.id}`);
      console.log(`      Name: ${asset.name}`);
      console.log(`      Category: ${asset.category}`);
      console.log(`      File Type: ${asset.fileType}`);
      console.log(`      Is Image: ${asset.fileType?.toLowerCase().includes('image') ? '✅ Yes' : '❌ No'}`);
      console.log(``);
    });
    
    if (assets.length > limitCount) {
      console.log(`   ... and ${assets.length - limitCount} more`);
    }
    
    return limitedAssets;
  } catch (error) {
    console.error(`❌ Error listing assets:`, error.message);
    throw error;
  }
}

/**
 * Complete test workflow: List assets, pick one, test format generation
 * 
 * @param {string} assetId - Optional asset ID. If not provided, will list assets first
 * @param {string} format - Format to test (png, jpg, webp)
 */
export async function testCompleteWorkflow(assetId = null, format = 'webp') {
  console.log(`\n🧪 Complete Format Service Test Workflow`);
  console.log(`==========================================`);
  
  if (!db) {
    console.error(`❌ Firebase not configured. Cannot test.`);
    return;
  }
  
  try {
    let testAssetId = assetId;
    
    // If no asset ID provided, list assets
    if (!testAssetId) {
      console.log(`\nStep 1: Finding assets...`);
      const assets = await listAssets(5);
      
      if (assets.length === 0) {
        console.error(`\n❌ No assets found. Please upload an image asset first.`);
        return;
      }
      
      // Pick first image asset
      const imageAsset = assets.find(a => a.fileType?.toLowerCase().includes('image'));
      if (!imageAsset) {
        console.error(`\n❌ No image assets found. Please upload an image asset first.`);
        return;
      }
      
      testAssetId = imageAsset.id;
      console.log(`\n✅ Using asset: ${imageAsset.name} (ID: ${testAssetId})`);
    }
    
    // Check current formats
    console.log(`\nStep 2: Checking current formats...`);
    await testGetAllFormats(testAssetId);
    
    // Test format generation
    console.log(`\nStep 3: Generating ${format.toUpperCase()} format...`);
    await testGenerateFormat(testAssetId, format, `Generate ${format.toUpperCase()}`);
    
    // Check formats again to see new format
    console.log(`\nStep 4: Checking formats after generation...`);
    await testGetAllFormats(testAssetId);
    
    // Verify it's cached
    console.log(`\nStep 5: Testing cache (should be instant)...`);
    const startTime = Date.now();
    await testGenerateFormat(testAssetId, format, `Cached ${format.toUpperCase()} (should be fast)`);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`   Cache duration: ${duration}s (should be < 0.5s)`);
    
    console.log(`\n✅ Test workflow complete!`);
    
  } catch (error) {
    console.error(`\n❌ Test workflow failed:`, error.message);
    throw error;
  }
}

// Make functions available globally for browser console testing
if (typeof window !== 'undefined') {
  window.testGenerateFormat = testGenerateFormat;
  window.testGetFormatInfo = testGetFormatInfo;
  window.testIsFormatAvailable = testIsFormatAvailable;
  window.testGetAllFormats = testGetAllFormats;
  window.listAssets = listAssets;
  window.testCompleteWorkflow = testCompleteWorkflow;
  
  console.log(`
📝 Format Service Test Utilities Loaded!

Available functions in console:
  - listAssets(limit) - List assets from Firestore to find asset IDs
  - testGenerateFormat(assetId, format, testName) - Generate a format
  - testGetFormatInfo(assetId, format) - Get format info
  - testIsFormatAvailable(assetId, format) - Check if format is available
  - testGetAllFormats(assetId) - Get all available formats
  - testCompleteWorkflow(assetId, format) - Complete test workflow

Quick start:
  listAssets() - Find asset IDs
  testCompleteWorkflow() - Run complete test (will pick first image asset)
  `);
}

