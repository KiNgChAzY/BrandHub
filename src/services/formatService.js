/**
 * Format Service
 * 
 * Handles format conversion, caching, and retrieval for asset images.
 * Uses lazy generation: converts formats on-demand and caches them in Firebase Storage.
 * 
 * Storage Path Structure: assets/{category}/{assetId}/formats/{format}.{ext}
 * Firestore Structure: availableFormats.{format} = { url, format, size, generatedAt }
 */

import { db, storage } from '../config/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { convertImageFormat, getFileExtension, getMimeType, isSVG } from '../utils/imageConverter';

/**
 * Generates or retrieves a format for an asset
 * 
 * @param {string} assetId - The asset document ID
 * @param {string} targetFormat - Target format (png, jpg, webp, svg, or 'original')
 * @returns {Promise<string>} - Download URL for the format
 * @throws {Error} - If generation fails
 */
export async function generateFormat(assetId, targetFormat) {
  if (!db || !storage) {
    throw new Error('Firebase not configured');
  }

  if (!assetId || !targetFormat) {
    throw new Error('assetId and targetFormat are required');
  }

  // Normalize format
  const format = targetFormat.toLowerCase();
  
  try {
    // Get asset document from Firestore
    const assetRef = doc(db, 'assets', assetId);
    const assetSnap = await getDoc(assetRef);
    
    if (!assetSnap.exists()) {
      throw new Error(`Asset with ID ${assetId} not found`);
    }
    
    const asset = assetSnap.data();
    const category = asset.category || 'template'; // Fallback to 'template' if missing
    
    // Check if format already exists in availableFormats
    const availableFormats = asset.availableFormats || {};
    
    if (format === 'original') {
      // Return original file URL
      if (asset.fileUrl) {
        return asset.fileUrl;
      }
      throw new Error('Original file URL not found');
    }
    
    // Check if this format is already cached
    if (availableFormats[format] && availableFormats[format].url) {
      console.log(`Format ${format} found in cache for asset ${assetId}`);
      return availableFormats[format].url;
    }
    
    // Format doesn't exist, need to generate it
    console.log(`Generating format ${format} for asset ${assetId}`);
    
    // Get original file URL
    const originalUrl = asset.fileUrl;
    if (!originalUrl) {
      throw new Error('Original file URL not found for conversion');
    }
    
    // Check if source is SVG and target is not SVG (can't convert)
    const sourceFileType = asset.fileType || '';
    if (isSVG(sourceFileType, originalUrl) && format !== 'svg') {
      throw new Error('Cannot convert SVG to raster format. SVG format is only available for SVG source files.');
    }
    
    // Convert image format using imageConverter
    const blob = await convertImageFormat(originalUrl, format);
    
    // Get file extension for storage path
    const extension = getFileExtension(format);
    const mimeType = getMimeType(format);
    
    // Upload converted blob to Firebase Storage
    // Storage path: assets/{category}/{assetId}/formats/{format}.{ext}
    const storagePath = `assets/${category}/${assetId}/formats/${format}.${extension}`;
    const storageRef = ref(storage, storagePath);
    
    // Upload blob
    await uploadBytes(storageRef, blob, {
      contentType: mimeType,
    });
    
    // Get download URL
    const downloadUrl = await getDownloadURL(storageRef);
    
    // Update Firestore with new format information
    const formatInfo = {
      url: downloadUrl,
      format: format,
      size: blob.size, // Store file size in bytes
      generatedAt: serverTimestamp(),
    };
    
    // Update availableFormats field in Firestore
    // Use dot notation to update nested field
    await updateDoc(assetRef, {
      [`availableFormats.${format}`]: formatInfo,
    });
    
    console.log(`Format ${format} generated and cached for asset ${assetId}`);
    
    return downloadUrl;
    
  } catch (error) {
    console.error(`Error generating format ${format} for asset ${assetId}:`, error);
    throw error;
  }
}

/**
 * Gets format information for an asset
 * 
 * @param {string} assetId - The asset document ID
 * @param {string} format - Format to check (png, jpg, webp, svg, or 'original')
 * @returns {Promise<Object|null>} - Format info object or null if not available
 */
export async function getFormatInfo(assetId, format) {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const assetRef = doc(db, 'assets', assetId);
    const assetSnap = await getDoc(assetRef);
    
    if (!assetSnap.exists()) {
      return null;
    }
    
    const asset = assetSnap.data();
    
    if (format === 'original') {
      return {
        url: asset.fileUrl,
        format: 'original',
        size: null, // Original size not stored currently
        generatedAt: asset.uploadedAt || null,
      };
    }
    
    const availableFormats = asset.availableFormats || {};
    return availableFormats[format] || null;
    
  } catch (error) {
    console.error(`Error getting format info for asset ${assetId}:`, error);
    throw error;
  }
}

/**
 * Checks if a format is available (cached) for an asset
 * 
 * @param {string} assetId - The asset document ID
 * @param {string} format - Format to check
 * @returns {Promise<boolean>} - True if format is available
 */
export async function isFormatAvailable(assetId, format) {
  try {
    const formatInfo = await getFormatInfo(assetId, format);
    return formatInfo !== null && formatInfo.url !== undefined;
  } catch (error) {
    console.error(`Error checking format availability:`, error);
    return false;
  }
}

/**
 * Gets all available formats for an asset
 * 
 * @param {string} assetId - The asset document ID
 * @returns {Promise<Object>} - Object with format keys and info values
 */
export async function getAllAvailableFormats(assetId) {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const assetRef = doc(db, 'assets', assetId);
    const assetSnap = await getDoc(assetRef);
    
    if (!assetSnap.exists()) {
      return {};
    }
    
    const asset = assetSnap.data();
    const formats = asset.availableFormats || {};
    
    // Always include original
    formats.original = {
      url: asset.fileUrl,
      format: 'original',
      size: null,
      generatedAt: asset.uploadedAt || null,
    };
    
    return formats;
    
  } catch (error) {
    console.error(`Error getting all available formats for asset ${assetId}:`, error);
    throw error;
  }
}

