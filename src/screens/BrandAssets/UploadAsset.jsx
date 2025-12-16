import React, { useState } from "react";
import { storage, db } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { sanitizeFileName, sanitizeText } from "../../utils/security";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_NAME_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 500;

export default function UploadAsset() {
  const { user, role } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("logo");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="card">
        <p className="text-muted-foreground">Please log in to upload assets.</p>
      </div>
    );
  }
  if (role !== "admin") {
    return (
      <div className="card">
        <p className="text-muted-foreground">Only admins can upload assets.</p>
      </div>
    );
  }

  function handleFileChange(e) {
    setError(null);
    const f = e.target.files[0];
    if (!f) return setFile(null);
    if (f.size > MAX_FILE_BYTES) return setError("File too large (max 10MB)");
    setFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!file) return setError("Please select a file.");
    
    // Validate inputs
    const sanitizedName = sanitizeText(name, MAX_NAME_LENGTH);
    if (!sanitizedName.trim()) {
      setError("Asset name is required.");
      return;
    }
    
    // Validate category (prevent manipulation)
    const validCategories = ['logo', 'typography', 'color', 'template', 'icon'];
    if (!validCategories.includes(category)) {
      setError("Invalid category selected.");
      return;
    }
    
    setLoading(true);
    try {
      // Sanitize file name to prevent path traversal attacks
      const safeFileName = sanitizeFileName(file.name);
      const storagePath = `assets/${category}/${Date.now()}_${safeFileName}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(pct);
        },
        (err) => {
          console.error(err);
          setError(err.message || "Upload failed");
          setLoading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          // Save metadata to Firestore (with sanitized inputs)
          await addDoc(collection(db, "assets"), {
            name: sanitizedName,
            category,
            fileUrl: url,
            fileType: file.type,
            uploadedBy: user.uid,
            uploadedAt: serverTimestamp(),
            downloads: 0,
            metadata: { description: sanitizeText(description, MAX_DESCRIPTION_LENGTH) },
          });
          setLoading(false);
          setProgress(100);
          setName("");
          setCategory("logo");
          setFile(null);
          setDescription("");
        }
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Upload error");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Upload Asset</h1>
        <p className="text-muted-foreground mb-6">Add a new brand asset to your library</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Asset Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="e.g., Primary Logo - Dark"
              required
              maxLength={MAX_NAME_LENGTH}
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum {MAX_NAME_LENGTH} characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              <option value="logo">Logo</option>
              <option value="typography">Typography</option>
              <option value="color">Color</option>
              <option value="template">Template</option>
              <option value="icon">Icon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">File</label>
            <input 
              type="file" 
              accept="*/*" 
              onChange={handleFileChange}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-card text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description (optional)</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              placeholder="Brief description of the asset"
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum {MAX_DESCRIPTION_LENGTH} characters</p>
          </div>
          {error && (
            <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          {loading && (
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary">Uploading...</span>
                <span className="text-sm font-medium text-primary">{progress}%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button 
            type="submit" 
            disabled={loading} 
            className="btn-success w-full"
          >
            {loading ? 'Uploading...' : 'Upload Asset'}
          </button>
        </form>
      </div>
    </div>
  );
}



