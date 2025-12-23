import React from "react";
import { X, Download, FileText, Image as ImageIcon, File, Video, Presentation } from "lucide-react";

/**
 * DownloadModal Component
 * Separate modal for downloading assets with format options and download confirmation.
 */
export default function DownloadModal({ asset, isOpen, onClose }) {
  if (!isOpen || !asset) return null;

  // Handle ESC key to close modal
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

  function handleDownload() {
    if (asset.fileUrl) {
      window.open(asset.fileUrl, "_blank");
      onClose();
    }
  }

  // Get icon for asset type
  function getAssetIcon() {
    const fileType = asset.fileType?.toLowerCase() || "";
    if (fileType.includes("image")) return <ImageIcon className="h-12 w-12 text-primary" />;
    if (fileType.includes("pdf")) return <FileText className="h-12 w-12 text-red-500" />;
    if (fileType.includes("video")) return <Video className="h-12 w-12 text-purple-500" />;
    if (fileType.includes("zip") || fileType.includes("font")) return <File className="h-12 w-12 text-blue-500" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-12 w-12 text-orange-500" />;
    return <FileText className="h-12 w-12 text-muted-foreground" />;
  }

  const isImage = asset.fileType?.toLowerCase().includes("image");

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="download-modal-title" className="text-2xl font-bold">
            Download Asset
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Asset Preview */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
              {isImage && asset.fileUrl ? (
                <img
                  src={asset.fileUrl}
                  alt={asset.name || "Asset preview"}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                getAssetIcon()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{asset.name || "Untitled"}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {asset.fileType || "file"} • {asset.category || "uncategorized"}
              </p>
            </div>
          </div>

          {/* Format Information */}
          <div className="bg-muted/50 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">File Format:</p>
            <p className="font-medium">{asset.fileType || "Unknown format"}</p>
            {asset.usageRules?.formatRecommendations && (
              <p className="text-xs text-muted-foreground mt-2">
                {asset.usageRules.formatRecommendations}
              </p>
            )}
          </div>

          {/* Download Warning (if restrictions exist) */}
          {asset.usageRules?.restrictions && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <p className="text-sm font-medium text-yellow-800 mb-1">Usage Restrictions:</p>
              <p className="text-xs text-yellow-700">{asset.usageRules.restrictions}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center gap-2 border border-border"
            aria-label="Download asset"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

