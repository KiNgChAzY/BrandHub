import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { X, Download, Edit, Trash2, FileText, Image as ImageIcon, File, Video, Presentation } from "lucide-react";
import AssetEditModal from "./AssetEditModal";

/**
 * AssetModal Component
 * Displays asset details in a modal dialog with split layout:
 * - Left: Image preview
 * - Right: Category badge, name, description, and info list
 */
export default function AssetModal({ assetId, asset: providedAsset, isOpen, onClose, onAssetUpdate }) {
  const { role } = useAuth();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [uploadedByUsername, setUploadedByUsername] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!isOpen || !assetId) {
      setAsset(null);
      setError(null);
      setImageDimensions(null);
      setFileSize(null);
      setUploadedByUsername(null);
      return;
    }

    // Handle when asset is provided directly
    if (providedAsset) {
      setAsset(providedAsset);
      setLoading(false);
      setError(null);
      return;
    }

    if (!db) {
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;
    async function loadAsset() {
      setLoading(true);
      setError(null);
      try {
        const assetRef = doc(db, "assets", assetId);
        const assetSnap = await getDoc(assetRef);
        if (mounted) {
          if (assetSnap.exists()) {
            const assetData = { id: assetSnap.id, ...assetSnap.data() };
            setAsset(assetData);
            
            // Load uploaded by username
            if (assetData.uploadedBy && db) {
              try {
                const userRef = doc(db, "users", assetData.uploadedBy);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                  const userData = userSnap.data();
                  setUploadedByUsername(userData.displayName || userData.email || "Unknown User");
                } else {
                  setUploadedByUsername("Unknown User");
                }
              } catch (err) {
                console.error("Error loading user:", err);
                setUploadedByUsername("Unknown User");
              }
            }
          } else {
            setError("Asset not found");
          }
        }
      } catch (err) {
        console.error("Error loading asset:", err);
        if (mounted) setError("Failed to load asset");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAsset();

    return () => {
      mounted = false;
    };
  }, [assetId, isOpen, providedAsset]);

  // Get image dimensions from metadata
  useEffect(() => {
    if (!asset || !asset.fileUrl) return;

    const fileType = asset.fileType?.toLowerCase() || "";
    if (fileType.includes("image")) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions(`${img.naturalWidth} X ${img.naturalHeight}px`);
      };
      img.onerror = () => {
        setImageDimensions("Unable to load dimensions");
      };
      img.src = asset.fileUrl;
    }
  }, [asset]);

  // Try to fetch file size
  useEffect(() => {
    if (!asset || !asset.fileUrl) return;

    // PLACEHOLDER: File size fetching - implement file size storage in Firestore when uploading
    // For full implementation, we should:
    // 1. Store file size in Firestore when uploading (in bytes)
    // 2. Or fetch file size via HEAD request to the file URL
    // For now, leaving as null/undefined - will show "Not available" in UI
    setFileSize(null);
  }, [asset]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e) {
      if (e.key === "Escape" && !showEditModal) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, showEditModal]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget && !showEditModal) {
      onClose();
    }
  }

  function handleDownload() {
    if (asset?.fileUrl) {
      window.open(asset.fileUrl, "_blank");
    }
  }

  function handleDelete() {
    // PLACEHOLDER: Delete functionality - implement delete with confirmation dialog
    console.log("Delete asset:", asset?.id);
  }

  function handleEditSave(updatedAsset) {
    setAsset(updatedAsset);
    if (onAssetUpdate) {
      onAssetUpdate(updatedAsset);
    }
  }

  // Get category display name
  function getCategoryDisplay(category) {
    const categoryMap = {
      logo: "Logo",
      typography: "Typography",
      color: "Color",
      template: "Template",
      icon: "Icon",
    };
    return categoryMap[category] || category || "Uncategorized";
  }

  // Get category badge styling
  function getCategoryBadgeStyle(category) {
    const categoryLower = (category || "").toLowerCase();
    switch (categoryLower) {
      case "logo":
        return "bg-blue-100 text-blue-700"; // light blue
      case "document":
        return "bg-green-100 text-green-700"; // light green
      case "template":
        return "bg-purple-100 text-purple-700"; // light purple
      case "color":
        return "bg-yellow-100 text-yellow-700"; // light yellow
      case "typography":
        return "bg-red-100 text-red-700"; // light red
      case "icon":
        return "bg-orange-100 text-orange-700"; // light orange
      default:
        return "bg-black text-white"; // inverse - black background, white text
    }
  }

  // Get file format display
  function getFileFormatDisplay() {
    if (!asset?.fileType) return "Not available";
    
    const fileType = asset.fileType.toLowerCase();
    let format = "";
    let transparency = "";

    if (fileType.includes("png")) {
      format = "PNG";
      transparency = "Transparent";
    } else if (fileType.includes("jpg") || fileType.includes("jpeg")) {
      format = "JPG";
      transparency = "Opaque";
    } else if (fileType.includes("svg")) {
      format = "SVG";
      transparency = "Vector";
    } else if (fileType.includes("pdf")) {
      format = "PDF";
      transparency = "";
    } else if (fileType.includes("gif")) {
      format = "GIF";
      transparency = "Animated";
    } else {
      // Extract format from MIME type
      const parts = asset.fileType.split("/");
      format = parts[1] ? parts[1].toUpperCase() : "Unknown";
    }

    return transparency ? `${format} (${transparency})` : format;
  }

  // Format file size
  function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return "Not available";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }

  if (!isOpen) return null;

  const isImage = asset?.fileType?.toLowerCase().includes("image");

  return (
    <>
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-modal-title"
      >
        <div
          id="asset-modal"
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side - Image Only */}
          <div className="w-1/2 bg-muted flex items-center justify-center min-h-[500px] relative">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : error ? (
              <div className="text-center p-8">
                <p className="text-destructive mb-4">{error}</p>
                <button onClick={onClose} className="btn-primary">
                  Close
                </button>
              </div>
            ) : asset ? (
              <>
                {isImage && asset.fileUrl ? (
                  <img
                    src={asset.fileUrl}
                    alt={asset.name || "Asset preview"}
                    className="max-w-full max-h-full object-contain p-8"
                  />
                ) : asset.fileType === "application/pdf" ? (
                  <div className="text-center">
                    <FileText className="h-24 w-24 text-red-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">PDF Document</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{asset.fileType || "File"}</p>
                  </div>
                )}
                {/* Close button on image side */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/80 rounded-xl transition-colors bg-white/50 backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          {/* Right Side - Information and Actions */}
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Title at top of right side */}
              <div>
                <h2 id="asset-modal-title" className="text-2xl font-bold mb-2">
                  {loading ? "Loading..." : asset?.name || "Asset Details"}
                </h2>
              </div>

              {asset && !loading && !error && (
                <>
                  {/* Category Badge */}
                  <div>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getCategoryBadgeStyle(asset.category)}`}>
                      {getCategoryDisplay(asset.category)}
                    </span>
                  </div>

                  {/* Description (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Description
                    </label>
                    <div className="min-h-[80px] p-3 rounded-lg border border-border bg-muted/30">
                      {asset.metadata?.description ? (
                        <p className="text-foreground whitespace-pre-wrap">
                          {asset.metadata.description}
                        </p>
                      ) : (
                        <p className="text-muted-foreground italic">No description provided</p>
                      )}
                    </div>
                  </div>

                  {/* Info List */}
                  <div className="space-y-3">
                    {/* Dimensions */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Dimensions</span>
                      <span className="text-sm text-foreground">
                        {imageDimensions || "Not available"}
                      </span>
                    </div>

                    {/* File Format */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">File Format</span>
                      <span className="text-sm text-foreground">
                        {getFileFormatDisplay()}
                      </span>
                    </div>

                    {/* Size */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Size</span>
                      <span className="text-sm text-foreground">
                        {fileSize ? formatFileSize(fileSize) : "Not available"}
                        {/* PLACEHOLDER: File size not currently stored. For full implementation:
                            1. Store file size in bytes when uploading asset
                            2. Or fetch via HEAD request to file URL
                        */}
                      </span>
                    </div>

                    {/* Uploaded by */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Uploaded by</span>
                      <span className="text-sm text-foreground">
                        {uploadedByUsername || "Loading..."}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons at bottom of right side */}
            {asset && !loading && !error && (
              <div className="border-t border-border p-6 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 border border-border"
                    aria-label="Download asset"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2 border border-border shadow-md"
                    aria-label="Edit asset"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 btn-danger flex items-center justify-center gap-2 border border-border"
                    aria-label="Delete asset"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AssetEditModal
        asset={asset}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
      />
    </>
  );
}
