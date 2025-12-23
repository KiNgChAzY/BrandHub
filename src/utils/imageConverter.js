/**
 * Image Conversion Utility
 * 
 * Provides functions to convert images between different formats (PNG, JPG, WebP)
 * using the HTML5 Canvas API. Handles SVG files by serving them directly.
 * 
 * Quality Settings:
 * - PNG: Lossless (no quality setting)
 * - JPG: 0.92 (92% quality)
 * - WebP: 0.85 (85% quality)
 * 
 * Size Limits:
 * - Maximum file size: 10MB (10 * 1024 * 1024 bytes)
 * - Warns user if image exceeds limit
 */

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Converts an image from one format to another using Canvas API
 * 
 * @param {string} imageUrl - URL of the source image
 * @param {string} targetFormat - Target format: 'png', 'jpg', 'jpeg', 'webp'
 * @param {number} quality - Quality setting (0-1) for lossy formats (JPG, WebP). Ignored for PNG.
 * @returns {Promise<Blob>} - Promise that resolves to a Blob of the converted image
 * @throws {Error} - If conversion fails
 */
export async function convertImageFormat(imageUrl, targetFormat, quality = null) {
  return new Promise((resolve, reject) => {
    // Normalize format
    const format = targetFormat.toLowerCase();
    
    // Set quality based on format (fixed values as per requirements)
    let qualitySetting;
    if (format === 'jpg' || format === 'jpeg') {
      qualitySetting = quality !== null ? quality : 0.92; // 92% quality for JPG
    } else if (format === 'webp') {
      qualitySetting = quality !== null ? quality : 0.85; // 85% quality for WebP
    } else if (format === 'png') {
      qualitySetting = undefined; // PNG is lossless, no quality setting
    } else {
      reject(new Error(`Unsupported target format: ${format}`));
      return;
    }

    // Create image element to load the source image
    const img = new Image();
    
    // Handle CORS - set crossOrigin to allow loading from Firebase Storage
    // Try 'anonymous' first, fallback to no CORS if that fails
    img.crossOrigin = 'anonymous';
    
    // Handle image load success
    img.onload = () => {
      try {
        // Check image size (approximate - actual blob size may vary)
        // This is a rough check; actual converted size may differ
        const estimatedSize = img.width * img.height * 4; // RGBA = 4 bytes per pixel
        if (estimatedSize > MAX_FILE_SIZE_BYTES) {
          console.warn(`Image dimensions (${img.width}x${img.height}) may result in large file size`);
          // Continue with conversion but warn user
        }

        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Convert canvas to blob in target format
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image: blob creation failed'));
              return;
            }

            // Check actual blob size
            if (blob.size > MAX_FILE_SIZE_BYTES) {
              reject(new Error(`Converted image exceeds size limit (${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB)`));
              return;
            }

            resolve(blob);
          },
          `image/${format}`, // MIME type
          qualitySetting // Quality (undefined for PNG)
        );
      } catch (error) {
        reject(new Error(`Image conversion failed: ${error.message}`));
      }
    };

    // Handle image load errors
    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error.message || 'Unknown error'}`));
    };

    // Start loading the image
    img.src = imageUrl;
  });
}

/**
 * Downloads an image blob as a file
 * 
 * @param {Blob} blob - The image blob to download
 * @param {string} filename - Base filename (without extension)
 * @param {string} format - File format/extension (png, jpg, webp, svg)
 */
export function downloadImage(blob, filename, format) {
  try {
    // Create object URL from blob
    const url = URL.createObjectURL(blob);
    
    // Create temporary download link
    const link = document.createElement('a');
    link.href = url;
    
    // Set filename with proper extension
    const extension = format.toLowerCase();
    link.download = `${filename}.${extension}`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error(`Failed to download image: ${error.message}`);
  }
}

/**
 * Checks if an image file is an SVG
 * 
 * @param {string} fileType - MIME type of the file (e.g., 'image/svg+xml')
 * @param {string} fileUrl - URL of the file (optional, for additional checking)
 * @returns {boolean} - True if file is SVG
 */
export function isSVG(fileType, fileUrl = '') {
  if (!fileType && !fileUrl) return false;
  
  // Check MIME type
  if (fileType && fileType.toLowerCase().includes('svg')) {
    return true;
  }
  
  // Check file extension in URL as fallback
  if (fileUrl) {
    const urlLower = fileUrl.toLowerCase();
    return urlLower.endsWith('.svg') || urlLower.includes('.svg?');
  }
  
  return false;
}

/**
 * Gets the MIME type for a given format
 * 
 * @param {string} format - Format name (png, jpg, jpeg, webp, svg)
 * @returns {string} - MIME type string
 */
export function getMimeType(format) {
  const formatLower = format.toLowerCase();
  switch (formatLower) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/png'; // Default fallback
  }
}

/**
 * Gets the file extension for a given format
 * 
 * @param {string} format - Format name (png, jpg, jpeg, webp, svg)
 * @returns {string} - File extension (without dot)
 */
export function getFileExtension(format) {
  const formatLower = format.toLowerCase();
  switch (formatLower) {
    case 'jpg':
    case 'jpeg':
      return 'jpg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    case 'svg':
      return 'svg';
    default:
      return 'png'; // Default fallback
  }
}

/**
 * Validates if a format conversion is supported
 * 
 * @param {string} sourceFormat - Source format (from fileType)
 * @param {string} targetFormat - Target format
 * @returns {boolean} - True if conversion is supported
 */
export function isConversionSupported(sourceFormat, targetFormat) {
  const source = sourceFormat?.toLowerCase() || '';
  const target = targetFormat?.toLowerCase() || '';
  
  // SVG can only be downloaded as SVG (no conversion)
  if (source.includes('svg')) {
    return target === 'svg';
  }
  
  // Supported target formats for raster images
  const supportedFormats = ['png', 'jpg', 'jpeg', 'webp'];
  return supportedFormats.includes(target);
}

/**
 * Gets available download formats for an image asset
 * 
 * @param {string} fileType - MIME type of the source file
 * @returns {string[]} - Array of available format options
 */
export function getAvailableFormats(fileType) {
  if (!fileType || !fileType.toLowerCase().includes('image')) {
    return []; // Not an image
  }
  
  const typeLower = fileType.toLowerCase();
  
  // If source is SVG, only SVG is available
  if (typeLower.includes('svg')) {
    return ['svg'];
  }
  
  // For raster images, all formats are available
  return ['original', 'png', 'jpg', 'webp'];
}

