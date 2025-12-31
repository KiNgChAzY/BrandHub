import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../contexts/AuthContext";
import { sanitizeFileName, sanitizeText } from "../../utils/security";
import { ArrowLeft, Download, Edit, Upload, X } from "lucide-react";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function AssetDetail() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [replaceFile, setReplaceFile] = useState(null);
  const [replaceProgress, setReplaceProgress] = useState(0);
  const [replacing, setReplacing] = useState(false);

  useEffect(() => {
    if (!db || !assetId) {
      setLoading(false);
      return;
    }

    async function loadAsset() {
      try {
        const assetRef = doc(db, "assets", assetId);
        const assetSnap = await getDoc(assetRef);
        if (assetSnap.exists()) {
          setAsset({ id: assetSnap.id, ...assetSnap.data() });
        } else {
          setError("Asset not found");
        }
      } catch (err) {
        console.error("Error loading asset:", err);
        setError("Failed to load asset");
      } finally {
        setLoading(false);
      }
    }

    loadAsset();
  }, [assetId]);

  function handleReplaceFileChange(e) {
    const file = e.target.files[0];
    if (!file) return setReplaceFile(null);
    if (file.size > MAX_FILE_BYTES) {
      setError("File too large (max 10MB)");
      return;
    }
    setReplaceFile(file);
    setError(null);
  }

  async function handleReplaceAsset() {
    if (!replaceFile || !asset) return;
    
    setReplacing(true);
    setError(null);
    
    try {
      // Upload new file
      const safeFileName = sanitizeFileName(replaceFile.name);
      const storagePath = `assets/${asset.category}/${Date.now()}_${safeFileName}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, replaceFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setReplaceProgress(pct);
          },
          reject,
          resolve
        );
      });

      const newUrl = await getDownloadURL(uploadTask.snapshot.ref);

      // Note: Old file deletion skipped for MVP - Firebase Storage cleanup can be handled separately
      // The old file URL will remain in storage but won't be referenced in Firestore

      // Note: Old file deletion skipped for MVP - Firebase Storage cleanup can be handled separately
      // The old file URL will remain in storage but won't be referenced in Firestore

      // Update Firestore document
      const assetRef = doc(db, "assets", asset.id);
      await updateDoc(assetRef, {
        fileUrl: newUrl,
        fileType: replaceFile.type,
        uploadedAt: serverTimestamp(),
      });

      // Reload asset
      const updatedSnap = await getDoc(assetRef);
      if (updatedSnap.exists()) {
        setAsset({ id: updatedSnap.id, ...updatedSnap.data() });
      }

      setShowReplaceModal(false);
      setReplaceFile(null);
      setReplaceProgress(0);
    } catch (err) {
      console.error("Error replacing asset:", err);
      setError(err.message || "Failed to replace asset");
    } finally {
      setReplacing(false);
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="text-center py-12 text-muted-foreground">Loading asset...</div>
      </div>
    );
  }

  if (error && !asset) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Link to="/assets" className="btn-primary">
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="card">
        <div className="text-center py-12 text-muted-foreground">Asset not found</div>
      </div>
    );
  }

  const usageRules = asset.usageRules || {};
  const hasUsageRules = usageRules.formatRecommendations || usageRules.restrictions || usageRules.usageNotes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/assets" className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground mb-2">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <Link to="/assets" className="hover:text-primary transition-colors">Assets</Link>
            <span>/</span>
            <span className="text-foreground">{asset.name || "Untitled Asset"}</span>
          </div>
          <h1 className="text-heading-xl">{asset.name || "Untitled Asset"}</h1>
          <p className="text-body-md text-muted-foreground mt-1">
            {asset.category || "uncategorized"} • {asset.fileType || "file"}
          </p>
        </div>
        {role === "admin" && (
          <button
            onClick={() => setShowReplaceModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Replace Asset
          </button>
        )}
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel (Left) - Preview & Download */}
        <div className="lg:col-span-2 space-y-6">
          {/* Asset Preview */}
          <div className="card">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {asset.fileType?.startsWith("image/") ? (
                <img
                  src={asset.fileUrl}
                  alt={asset.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : asset.fileType === "application/pdf" ? (
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-muted-foreground">PDF Preview</p>
                  <a
                    href={asset.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary mt-4 inline-block"
                  >
                    Open PDF
                  </a>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📎</div>
                  <p className="text-muted-foreground">{asset.fileType || "File"}</p>
                </div>
              )}
            </div>
          </div>

          {/* Format & Download */}
          <div className="card">
            <h2 className="text-heading-md mb-4">Download</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Format</label>
                <div className="px-4 py-2 rounded-lg bg-muted border border-border">
                  {asset.fileType || "Unknown format"}
                </div>
              </div>
              <a
                href={asset.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Asset
              </a>
            </div>
          </div>
        </div>

        {/* Side Panel (Right) - Usage Rules */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-heading-md mb-4">Usage Rules</h2>
            {hasUsageRules ? (
              <div className="space-y-4">
                {usageRules.formatRecommendations && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Format Recommendations</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {usageRules.formatRecommendations}
                    </p>
                  </div>
                )}
                {usageRules.restrictions && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Restrictions</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {usageRules.restrictions}
                    </p>
                  </div>
                )}
                {usageRules.usageNotes && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Usage Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {usageRules.usageNotes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <p className="text-body-sm">No usage rules defined</p>
                <p className="text-caption mt-2">Admins can add rules when uploading assets</p>
              </div>
            )}
          </div>

          {/* Asset Info */}
          <div className="card">
            <h2 className="text-heading-md mb-4">Asset Information</h2>
            <div className="space-y-3 text-body-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 px-2 py-1 rounded-full bg-success-light text-success-foreground text-label-sm font-medium">
                  Current
                </span>
              </div>
              {asset.uploadedAt && (
                <div>
                  <span className="text-muted-foreground">Last updated:</span>
                  <span className="ml-2 text-foreground">
                    {asset.uploadedAt?.toDate ? 
                      asset.uploadedAt.toDate().toLocaleDateString() : 
                      asset.uploadedAt?.seconds ?
                      new Date(asset.uploadedAt.seconds * 1000).toLocaleDateString() :
                      "Unknown"}
                  </span>
                </div>
              )}
              {asset.metadata?.description && (
                <div>
                  <span className="text-muted-foreground">Description:</span>
                  <p className="mt-1 text-foreground">{asset.metadata.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Replace Asset Modal */}
      {showReplaceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-lg">Replace Asset</h2>
              <button
                onClick={() => {
                  setShowReplaceModal(false);
                  setReplaceFile(null);
                  setError(null);
                }}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a new file to replace the current asset. The old file will be removed.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New File</label>
                <input
                  type="file"
                  onChange={handleReplaceFileChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
                  disabled={replacing}
                />
                <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-body-sm">
                  {error}
                </div>
              )}
              {replacing && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary">Replacing asset...</span>
                    <span className="text-sm font-medium text-primary">{replaceProgress}%</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${replaceProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleReplaceAsset}
                  disabled={!replaceFile || replacing}
                  className="btn-primary flex-1"
                >
                  {replacing ? "Replacing..." : "Replace Asset"}
                </button>
                <button
                  onClick={() => {
                    setShowReplaceModal(false);
                    setReplaceFile(null);
                    setError(null);
                  }}
                  disabled={replacing}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

