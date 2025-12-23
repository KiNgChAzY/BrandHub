import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { isValidEmail, isValidRole, sanitizeText } from "../utils/security";
import { X, UserPlus } from "lucide-react";

/**
 * UserInvite Component
 * 
 * MVP UI Placeholder: This component provides a user interface for inviting users by email.
 * Currently, it only validates input and shows a success message - no data is stored.
 * 
 * Future Implementation:
 * - Store invitations in Firestore `invitations` collection
 * - Data structure: { email, role, invitedBy, invitedByEmail, invitedAt, status }
 * - Add email sending functionality
 * - Track invitation status (pending/accepted/expired)
 * 
 * TODO: Add Firestore integration in handleSubmit function
 * TODO: Add duplicate invitation check (query Firestore before creating)
 * TODO: Add email sending service integration
 */

const MAX_EMAIL_LENGTH = 254;

export default function UserInvite({ isOpen, onClose }) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Don't render if modal is not open
  if (!isOpen) return null;

  /**
   * Validates form inputs before submission
   * @returns {boolean} - True if validation passes
   */
  function validateForm() {
    setError(null);

    // Validate email
    if (!email.trim()) {
      setError("Please enter an email address.");
      return false;
    }

    // Sanitize and validate email format
    const sanitizedEmail = sanitizeText(email.trim().toLowerCase(), MAX_EMAIL_LENGTH);
    if (!isValidEmail(sanitizedEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Validate role
    if (!isValidRole(role)) {
      setError("Invalid role selected.");
      return false;
    }

    return true;
  }

  /**
   * Handles form submission
   * 
   * MVP: Currently only validates and shows success message
   * Future: Will store invitation in Firestore and send email
   */
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Simulate API call delay (for better UX)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Firestore Integration
      // 1. Check for duplicate invitation:
      //    const invitationsRef = collection(db, "invitations");
      //    const q = query(invitationsRef, where("email", "==", sanitizedEmail));
      //    const existingInvites = await getDocs(q);
      //    if (!existingInvites.empty) {
      //      setError("An invitation has already been sent to this email address.");
      //      return;
      //    }
      //
      // 2. Create invitation document:
      //    await addDoc(collection(db, "invitations"), {
      //      email: sanitizedEmail,
      //      role: role,
      //      invitedBy: user?.uid || "unknown",
      //      invitedByEmail: user?.email || "unknown",
      //      invitedAt: serverTimestamp(),
      //      status: "pending",
      //      expiresAt: null, // Can be set to expire after X days if needed
      //    });
      //
      // 3. Send invitation email (via Firebase Functions or email service)

      // MVP: Show success message (no actual storage)
      setSuccess(true);
      
      // Reset form
      setEmail("");
      setRole("user");
    } catch (err) {
      console.error("Error in invitation (placeholder):", err);
      setError("Failed to process invitation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /**
   * Handles modal close
   * Resets all form state when closing
   */
  function handleClose() {
    if (submitting) return; // Prevent closing during submission
    
    setEmail("");
    setRole("user");
    setError(null);
    setSuccess(false);
    onClose();
  }

  /**
   * Handles success message close
   * 
   * NOTE: Currently requires user click to close.
   * To change to auto-close: Replace this function with:
   *   setTimeout(() => {
   *     setSuccess(false);
   *     handleClose();
   *   }, 2000);
   */
  function handleSuccessClose() {
    setSuccess(false);
    handleClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-lg border border-border p-6 max-w-md w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-primary/10">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Invite User</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-2xl transition-colors"
            disabled={submitting}
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success State */}
        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-lg font-medium text-primary mb-2">Invitation Sent!</p>
            <p className="text-sm text-muted-foreground mb-6">
              The user will receive an email invitation to join.
            </p>
            <button
              onClick={handleSuccessClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="invite-email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null); // Clear error on input change
                }}
                className="input"
                placeholder="user@example.com"
                maxLength={MAX_EMAIL_LENGTH}
                disabled={submitting}
                required
                autoFocus
              />
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="invite-role" className="block text-sm font-medium text-foreground mb-2">
                Role
              </label>
              <select
                id="invite-role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setError(null); // Clear error on selection change
                }}
                className="input"
                disabled={submitting}
                required
              >
                <option value="user">User (View/Download)</option>
                <option value="admin">Admin (Upload/Edit/Delete)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Users can view and download assets. Admins can upload, edit, and delete assets.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting || !email.trim()}
                className="btn-primary flex-1"
              >
                {submitting ? "Sending..." : "Send Invitation"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

