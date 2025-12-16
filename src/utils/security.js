/**
 * Security utility functions for input validation and sanitization
 */

/**
 * Sanitizes a file name to prevent path traversal attacks
 * Removes dangerous characters and path separators
 * @param {string} fileName - Original file name
 * @returns {string} - Sanitized file name
 */
export function sanitizeFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    return 'file';
  }
  
  // Remove path traversal attempts and dangerous characters
  // Replace path separators, null bytes, and other dangerous chars
  let sanitized = fileName
    .replace(/\.\./g, '') // Remove parent directory references
    .replace(/\//g, '_') // Replace forward slashes
    .replace(/\\/g, '_') // Replace backslashes
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[<>:"|?*]/g, '_') // Replace Windows reserved characters
    .trim();
  
  // Limit length to prevent DoS
  const MAX_LENGTH = 255;
  if (sanitized.length > MAX_LENGTH) {
    const ext = sanitized.substring(sanitized.lastIndexOf('.'));
    sanitized = sanitized.substring(0, MAX_LENGTH - ext.length) + ext;
  }
  
  // Ensure we have a valid filename
  if (!sanitized || sanitized === '.' || sanitized === '..') {
    sanitized = 'file';
  }
  
  return sanitized;
}

/**
 * Validates and sanitizes text input
 * @param {string} text - Input text
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Sanitized text
 */
export function sanitizeText(text, maxLength = 1000) {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  // Trim and limit length
  let sanitized = text.trim();
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Validates email format (basic check, Firebase will do full validation)
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid format
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Basic email format check (Firebase will do full validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length <= 254 && emailRegex.test(email);
}

/**
 * Validates role selection
 * @param {string} role - Role to validate
 * @returns {boolean} - True if valid role
 */
export function isValidRole(role) {
  const validRoles = ['admin', 'user'];
  return validRoles.includes(role);
}

