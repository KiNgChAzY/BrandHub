/**
 * Translates Firebase error codes to user-friendly messages
 * @param {Error} error - Firebase error object
 * @returns {string} - User-friendly error message
 */
export function getFirebaseErrorMessage(error) {
  if (!error || !error.code) {
    return error?.message || "An unexpected error occurred. Please try again.";
  }

  const errorCode = error.code;

  // Firebase Authentication error codes
  const errorMessages = {
    // Login errors
    "auth/invalid-login-credentials": "Invalid email or password. Please check your credentials and try again.",
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-email": "Invalid email address. Please check and try again.",
    "auth/user-disabled": "This account has been disabled. Please contact support.",
    
    // Signup errors
    "auth/email-already-in-use": "An account with this email already exists. Please sign in instead.",
    "auth/weak-password": "Password is too weak. Please use at least 6 characters.",
    "auth/invalid-password": "Invalid password. Please use at least 6 characters.",
    
    // Network errors
    "auth/network-request-failed": "Network error. Please check your internet connection and try again.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    
    // General errors
    "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
    "auth/requires-recent-login": "Please sign in again to complete this action.",
  };

  // Return user-friendly message if available, otherwise return a generic message
  return errorMessages[errorCode] || "An error occurred. Please try again.";
}

