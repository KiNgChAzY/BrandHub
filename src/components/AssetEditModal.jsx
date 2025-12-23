import React, { useState } from "react";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { X, Save } from "lucide-react";
import { sanitizeText } from "../utils/security";

const MAX_NAME_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 500;

/**
 * AssetEditModal Component
 * Modal for editing asset name and description.
 */
export default function AssetEditModal({ asset, isOpen, onClose, onSave }) {
  const { role } = useAuth();
  const [name, setName] = useState(asset?.name || "");
  const [description, setDescription] = useState(asset?.metadata?.description || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (asset) {
      setName(asset.name || "");
      setDescription(asset.metadata?.description || "");
    }
  }, [asset]);

  React.useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  async function handleSave() {
    if (!asset) return;

    setError(null);
    setSaving(true);

    try {
      if (!db) {
        setError("Database not available");
        setSaving(false);
        return;
      }

      const assetRef = doc(db, "assets", asset.id);
      const updates = {};

      const sanitizedName = sanitizeText(name, MAX_NAME_LENGTH).trim();
      const sanitizedDescription = sanitizeText(description, MAX_DESCRIPTION_LENGTH).trim();

      if (sanitizedName) {
        updates.name = sanitizedName;
      }

      if (sanitizedDescription !== (asset.metadata?.description || "")) {
        updates["metadata.description"] = sanitizedDescription;
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(assetRef, updates);
      }

      if (onSave) {
        onSave({
          ...asset,
          name: sanitizedName || asset.name,
          metadata: {
            ...asset.metadata,
            description: sanitizedDescription,
          },
        });
      }

      onClose();
    } catch (err) {
      console.error("Error updating asset:", err);
      setError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen || !asset) return null;

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="edit-modal-title" className="text-2xl font-bold">
            Edit Asset
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
            aria-label="Close modal"
            disabled={saving}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Asset Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter asset name"
              maxLength={MAX_NAME_LENGTH}
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Enter description (optional)"
              rows={4}
              maxLength={MAX_DESCRIPTION_LENGTH}
              disabled={saving}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {description.length}/{MAX_DESCRIPTION_LENGTH} characters
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
            disabled={saving}
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

