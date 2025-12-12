import React, { useState } from "react";
import { storage, db } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function BrandSweep() {
  const { user } = useAuth();
  const [oldLogo, setOldLogo] = useState(null);
  const [newLogo, setNewLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [sweepStatus, setSweepStatus] = useState("idle"); // idle, uploading, running, completed

  if (!user) {
    return (
      <div className="card">
        <p className="text-gray-600">Please log in to run brand sweeps.</p>
      </div>
    );
  }

  function handleOldLogoChange(e) {
    setError(null);
    const file = e.target.files[0];
    if (!file) return setOldLogo(null);
    if (file.size > MAX_FILE_BYTES) {
      setError("Old logo file too large (max 10MB)");
      return;
    }
    setOldLogo(file);
  }

  function handleNewLogoChange(e) {
    setError(null);
    const file = e.target.files[0];
    if (!file) return setNewLogo(null);
    if (file.size > MAX_FILE_BYTES) {
      setError("New logo file too large (max 10MB)");
      return;
    }
    setNewLogo(file);
  }

  // Mock API simulation - generates fake detected sites
  function generateMockResults() {
    const mockSites = [
      { url: "https://example.com", asset: "old_logo.png", action: "Replace", confidence: 0.92 },
      { url: "https://oldbrand.com", asset: "legacy_logo.jpg", action: "Replace", confidence: 0.87 },
      { url: "https://partner-site.com/about", asset: "old_logo.png", action: "Replace", confidence: 0.78 },
    ];
    return mockSites;
  }

  async function handleRunSweep() {
    setError(null);
    setResults(null);
    
    if (!oldLogo || !newLogo) {
      setError("Please upload both old and new logos.");
      return;
    }

    if (!storage || !db) {
      setError("Firebase not configured. Please set up .env.local with Firebase credentials.");
      return;
    }

    setLoading(true);
    setSweepStatus("uploading");
    setProgress(0);

    try {
      // Upload both logos to Firebase Storage
      const timestamp = Date.now();
      const oldLogoPath = `sweeps/${timestamp}_old_${oldLogo.name}`;
      const newLogoPath = `sweeps/${timestamp}_new_${newLogo.name}`;

      const oldLogoRef = ref(storage, oldLogoPath);
      const newLogoRef = ref(storage, newLogoPath);

      // Upload old logo
      const oldUploadTask = uploadBytesResumable(oldLogoRef, oldLogo);
      await new Promise((resolve, reject) => {
        oldUploadTask.on(
          "state_changed",
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 50);
            setProgress(pct);
          },
          reject,
          resolve
        );
      });
      const oldLogoUrl = await getDownloadURL(oldUploadTask.snapshot.ref);

      // Upload new logo
      const newUploadTask = uploadBytesResumable(newLogoRef, newLogo);
      await new Promise((resolve, reject) => {
        newUploadTask.on(
          "state_changed",
          (snapshot) => {
            const pct = 50 + Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 20);
            setProgress(pct);
          },
          reject,
          resolve
        );
      });
      const newLogoUrl = await getDownloadURL(newUploadTask.snapshot.ref);

      setProgress(70);
      setSweepStatus("running");

      // Simulate API call with 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setProgress(100);

      // Generate mock results
      const detectedSites = generateMockResults();

      // Save sweep results to Firestore
      const sweepData = {
        initiatedBy: user.uid,
        oldLogoUrl: oldLogoUrl,
        newLogoUrl: newLogoUrl,
        status: "completed",
        detectedSites: detectedSites,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "sweeps"), sweepData);

      setResults(detectedSites);
      setSweepStatus("completed");
      setLoading(false);
    } catch (err) {
      console.error("Sweep error:", err);
      setError(err.message || "Sweep failed. Please try again.");
      setLoading(false);
      setSweepStatus("idle");
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Brand Sweep</h1>
      <p className="text-gray-600 mb-8">Scan the web for outdated brand usage</p>
      
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4">Upload Logos</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Old Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleOldLogoChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              disabled={loading}
            />
            {oldLogo && (
              <p className="text-xs text-gray-600 mt-1">Selected: {oldLogo.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New/Current Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleNewLogoChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              disabled={loading}
            />
            {newLogo && (
              <p className="text-xs text-gray-600 mt-1">Selected: {newLogo.name}</p>
            )}
          </div>
          <p className="text-xs text-gray-500">Maximum file size: 10MB per file</p>
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          {loading && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700">
                  {sweepStatus === "uploading" ? "Uploading logos..." : "Running sweep..."}
                </span>
                <span className="text-sm font-medium text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button 
            onClick={handleRunSweep}
            disabled={loading || !oldLogo || !newLogo}
            className="btn-primary w-full"
          >
            {loading ? "Running Sweep..." : "Run Sweep"}
          </button>
        </div>
      </div>

      {results && results.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Sweep Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">URL</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Detected Asset</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {results.map((site, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <a href={site.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {site.url}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{site.asset}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-medium">
                        {site.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {Math.round(site.confidence * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {results && results.length === 0 && (
        <div className="card">
          <p className="text-gray-600 text-center py-8">No outdated brand usage detected. Your brand is consistent!</p>
        </div>
      )}
    </div>
  );
}



