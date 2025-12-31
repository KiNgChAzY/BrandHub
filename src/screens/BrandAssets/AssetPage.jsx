import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import {
  FileText,
  Image as ImageIcon,
  File,
  Video,
  Presentation,
  Upload,
  Grid3x3,
  List,
  ChevronDown,
  Download,
  Edit2,
  Save,
  X as XIcon,
} from "lucide-react";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import AssetModal from "../../components/AssetModal";
import DownloadModal from "../../components/DownloadModal";

// Wrapper component to pass asset data to AssetModal
function AssetModalWithData({ assetId, asset, isOpen, onClose, onAssetUpdate }) {
  return <AssetModal assetId={assetId} asset={asset} isOpen={isOpen} onClose={onClose} onAssetUpdate={onAssetUpdate} />;
}

// Category mapping: UI categories to Firestore categories
const CATEGORY_MAP = {
  all: null, // Show all
  logos: "logo",
  images: "logo", // Images are typically logos/icons
  documents: "template", // Documents are typically templates
  videos: "template", // Videos can be templates
  presentations: "template",
  "social-media": "template", // Social media assets are templates
  audio: "template",
};

// Reverse mapping for display
const CATEGORY_DISPLAY = {
  logo: "Logos",
  typography: "Typography",
  color: "Colors",
  template: "Templates",
  icon: "Icons",
};

export default function AssetPage() {
  const { user, role } = useAuth();
  const location = useLocation();
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadAsset, setDownloadAsset] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    let mounted = true;
    async function loadAssets() {
      try {
        const q = query(collection(db, "assets"), orderBy("uploadedAt", "desc"));
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) {
          setAssets(list);
          setFilteredAssets(list);
        }
      } catch (err) {
        console.error("Error loading assets:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadAssets();
    return () => {
      mounted = false;
    };
  }, []);

  // Filter assets by selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredAssets(assets);
    } else {
      const firestoreCategory = CATEGORY_MAP[selectedCategory];
      if (firestoreCategory) {
        setFilteredAssets(assets.filter((a) => a.category === firestoreCategory));
      } else {
        setFilteredAssets(assets);
      }
    }
  }, [selectedCategory, assets]);

  // Get icon for asset type
  function getAssetIcon(asset) {
    const fileType = asset.fileType?.toLowerCase() || "";
    if (fileType.includes("image")) return <ImageIcon className="h-12 w-12 text-primary" />;
    if (fileType.includes("pdf")) return <FileText className="h-12 w-12 text-red-500" />;
    if (fileType.includes("video")) return <Video className="h-12 w-12 text-purple-500" />;
    if (fileType.includes("zip") || fileType.includes("font")) return <File className="h-12 w-12 text-blue-500" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-12 w-12 text-orange-500" />;
    return <FileText className="h-12 w-12 text-muted-foreground" />;
  }

  // Get background color for asset preview
  function getAssetPreviewBg(asset) {
    const fileType = asset.fileType?.toLowerCase() || "";
    if (fileType.includes("image")) return "bg-muted";
    if (fileType.includes("pdf")) return "bg-error-light";
    if (fileType.includes("zip") || fileType.includes("font")) return "bg-info-light";
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return "bg-warning-light";
    return "bg-muted";
  }

  // Format date for display
  function formatDate(timestamp) {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }

  // Handle inline editing
  function startEditing(asset) {
    setEditingAssetId(asset.id);
    setEditName(asset.name || "");
    setEditDescription(asset.metadata?.description || "");
  }

  function cancelEditing() {
    setEditingAssetId(null);
    setEditName("");
    setEditDescription("");
  }

  async function saveEdit(assetId) {
    if (!db) {
      cancelEditing();
      return;
    }
    
    setSaving(true);
    try {
      const assetRef = doc(db, "assets", assetId);
      const updates = {};
      
      if (editName.trim()) {
        updates.name = editName.trim();
      }
      
      if (editDescription.trim()) {
        updates["metadata.description"] = editDescription.trim();
      }
      
      if (Object.keys(updates).length > 0) {
        await updateDoc(assetRef, updates);
        
        // Update local state
        setAssets(prev => prev.map(a => 
          a.id === assetId 
            ? { ...a, name: editName.trim(), metadata: { ...a.metadata, description: editDescription.trim() } }
            : a
        ));
        setFilteredAssets(prev => prev.map(a => 
          a.id === assetId 
            ? { ...a, name: editName.trim(), metadata: { ...a.metadata, description: editDescription.trim() } }
            : a
      ));
      }
      
      cancelEditing();
    } catch (err) {
      console.error("Error updating asset:", err);
      alert("Failed to update asset. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleDownloadClick(e, asset) {
    e.stopPropagation();
    setDownloadAsset(asset);
    setIsDownloadModalOpen(true);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-body-md text-muted-foreground">Loading assets…</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: "all", label: "All Assets" },
    { id: "logos", label: "Logos" },
    { id: "images", label: "Images" },
    { id: "documents", label: "Documents" },
    { id: "videos", label: "Videos" },
    { id: "presentations", label: "Presentations" },
    { id: "social-media", label: "Social Media" },
    { id: "audio", label: "Audio" },
  ];

  // Get current category from URL search params
  const urlParams = new URLSearchParams(location.search);
  const urlCategory = urlParams.get("category");
  const currentCategoryLabel = urlCategory === "logo" ? "Logos" : "All Assets";

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <Link to="/assets" className="hover:text-primary transition-colors">Assets</Link>
            {urlCategory && (
              <>
                <span>/</span>
                <span className="text-foreground">{currentCategoryLabel}</span>
              </>
            )}
          </div>
          <h1 className="text-heading-xl">{currentCategoryLabel}</h1>
          <p className="text-body-md text-muted-foreground">
            Manage, organize and download company branding materials
          </p>
        </div>
        {role === "admin" && (
          <Link
            to="/upload"
            className="whitespace-nowrap shrink-0 flex items-center gap-2 btn-primary w-fit"
          >
            <Upload className="h-5 w-5" />
            <span>Upload New Asset</span>
          </Link>
        )}
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center justify-center px-4 py-2 rounded-full text-label-md font-medium whitespace-nowrap transition-all active:scale-95 ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-sleek"
                : "bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground hover:border-primary-accent/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div className="flex flex-wrap gap-2">
          {/* File Type Filter - UI Placeholder */}
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-card border border-border hover:border-text-tertiary/50 pl-3 pr-2 transition-all">
            <span className="text-foreground text-label-md font-medium">File Type</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          {/* Date Modified Filter - UI Placeholder */}
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-card border border-border hover:border-text-tertiary/50 pl-3 pr-2 transition-all">
            <span className="text-foreground text-label-md font-medium">Date Modified</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          {/* Owner Filter - UI Placeholder */}
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-card border border-border hover:border-text-tertiary/50 pl-3 pr-2 transition-all">
            <span className="text-foreground text-label-md font-medium">Owner</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border">
          <button
            onClick={() => setViewMode("list")}
            className={`size-8 flex items-center justify-center rounded transition-colors ${
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
            title="List view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`size-8 flex items-center justify-center rounded transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
            title="Grid view"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Assets Grid/List */}
      {!filteredAssets.length ? (
        <div className="card">
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <p className="text-body-md">
              {selectedCategory === "all"
                ? "No assets found. Upload your first asset to get started!"
                : `No ${categories.find((c) => c.id === selectedCategory)?.label.toLowerCase()} found.`}
            </p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {filteredAssets.map((asset) => {
            const isImage = asset.fileType?.toLowerCase().includes("image");
            return (
              <div
                key={asset.id}
                className="group flex flex-col h-full bg-card border border-border rounded-lg hover:shadow-float transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedAssetId(asset.id);
                  setIsModalOpen(true);
                }}
              >
                {/* Preview Section */}
                <div className={`relative w-full aspect-[4/3] ${getAssetPreviewBg(asset)} border-b border-border flex items-center justify-center overflow-hidden`}>
                  {isImage && asset.fileUrl ? (
                    <img
                      src={asset.fileUrl}
                      alt={asset.name || "Asset preview"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300/cccccc/666666?text=Asset+Preview";
                      }}
                    />
                  ) : asset.fileUrl ? (
                    // Show placeholder for non-image assets with fileUrl
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="https://via.placeholder.com/400x300/cccccc/666666?text=Asset+Preview"
                        alt="Placeholder preview"
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute">{getAssetIcon(asset)}</div>
                    </div>
                  ) : (
                    // Show icon for assets without fileUrl
                    <div className="flex items-center justify-center">{getAssetIcon(asset)}</div>
                  )}
                  {/* NEW Badge - Show if uploaded within last 24 hours */}
                  {asset.uploadedAt && (() => {
                    const uploadDate = asset.uploadedAt.toDate ? asset.uploadedAt.toDate() : new Date(asset.uploadedAt);
                    const hoursSinceUpload = (Date.now() - uploadDate.getTime()) / (1000 * 60 * 60);
                    return hoursSinceUpload < 24 ? (
                      <div className="absolute top-3 right-3 bg-success text-white text-label-sm font-semibold px-2 py-1 rounded-full shadow-sleek z-10">
                        NEW
                      </div>
                    ) : null;
                  })()}
                </div>

                  {/* Asset Info */}
                <div className="p-4 flex flex-col flex-1 gap-3">
                  {editingAssetId === asset.id ? (
                    /* Edit Mode */
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="input"
                        placeholder="Asset name"
                        maxLength={200}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="input min-h-[80px] resize-none"
                        placeholder="Description (optional)"
                        rows={2}
                        maxLength={500}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEdit(asset.id);
                          }}
                          disabled={saving}
                          className="flex-1 btn-primary flex items-center justify-center gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEditing();
                          }}
                          disabled={saving}
                          className="btn-ghost h-10 px-3 flex items-center justify-center"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-heading-sm line-clamp-2" title={asset.name || "Untitled"}>
                          {asset.name || asset.filename || "Untitled"}
                        </h3>
                        {asset.metadata?.description && (
                          <p className="text-body-sm text-muted-foreground line-clamp-2 mt-1">
                            {asset.metadata.description}
                          </p>
                        )}
                        <p className="text-caption mt-2">
                          Updated {formatDate(asset.uploadedAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto pt-2 flex items-center gap-2">
                        <button
                          onClick={(e) => handleDownloadClick(e, asset)}
                          className="flex-1 btn-secondary flex items-center justify-center gap-2"
                        >
                          <span>Download</span>
                          <Download className="h-4 w-4" />
                        </button>
                        {role === "admin" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(asset);
                            }}
                            className="btn-ghost size-10 flex items-center justify-center"
                            title="Edit asset"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // List View
        <div className="space-y-2 pb-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-card transition-all cursor-pointer"
              onClick={() => {
                setSelectedAssetId(asset.id);
                setIsModalOpen(true);
              }}
            >
              <div className={`w-16 h-16 ${getAssetPreviewBg(asset)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {getAssetIcon(asset)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-heading-sm truncate">{asset.name || asset.filename || "Untitled"}</h3>
                <p className="text-body-sm text-muted-foreground truncate">
                  {asset.category ? CATEGORY_DISPLAY[asset.category] || asset.category : "Uncategorized"} • {formatDate(asset.uploadedAt)}
                </p>
              </div>
              <button
                onClick={(e) => handleDownloadClick(e, asset)}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Asset Preview Modal */}
      {isModalOpen && selectedAssetId && (
        <AssetModalWithData
          assetId={selectedAssetId}
          asset={assets.find(a => a.id === selectedAssetId)}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAssetId(null);
          }}
          onAssetUpdate={(updatedAsset) => {
            // Update asset in the assets list
            setAssets(prev => prev.map(a => a.id === updatedAsset.id ? updatedAsset : a));
            setFilteredAssets(prev => prev.map(a => a.id === updatedAsset.id ? updatedAsset : a));
          }}
        />
      )}

      {/* Download Modal */}
      <DownloadModal
        asset={downloadAsset}
        isOpen={isDownloadModalOpen}
        onClose={() => {
          setIsDownloadModalOpen(false);
          setDownloadAsset(null);
        }}
      />
    </div>
  );
}

