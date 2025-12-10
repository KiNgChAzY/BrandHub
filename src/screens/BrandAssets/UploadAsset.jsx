import React, { useState } from "react";
import { storage, db } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function UploadAsset() {
  const { user, role } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("logo");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) return <div>Please log in to upload assets.</div>;
  if (role !== "admin") return <div>Only admins can upload assets.</div>;

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
    setLoading(true);
    try {
      const storagePath = `assets/${category}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(pct);
        },
        (err) => {
          console.error(err);
          setError(err.message || "Upload failed");
          setLoading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          // Save metadata to Firestore
          await addDoc(collection(db, "assets"), {
            name,
            category,
            fileUrl: url,
            fileType: file.type,
            uploadedBy: user.uid,
            uploadedAt: serverTimestamp(),
            downloads: 0,
            metadata: { description },
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
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-xl mb-3">Upload Asset</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Asset Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" required />
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white">
            <option value="logo">Logo</option>
            <option value="typography">Typography</option>
            <option value="color">Color</option>
            <option value="template">Template</option>
            <option value="icon">Icon</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">File</label>
          <input type="file" accept="*/*" onChange={handleFileChange} />
        </div>
        <div>
          <label className="block text-sm">Description (optional)</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" />
        </div>
        {error && <div className="text-red-400">{error}</div>}
        {loading && <div>Uploading: {progress}%</div>}
        <button disabled={loading} className="px-4 py-2 bg-green-600 rounded">Upload</button>
      </form>
    </div>
  );
}
