import React, { useState } from "react";
import { storage, db } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { sanitizeFileName } from "../utils/security";

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
        <p className="text-muted-foreground">Please log in to run brand sweeps.</p>
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
      // Sanitize file names to prevent path traversal attacks
      const timestamp = Date.now();
      const safeOldFileName = sanitizeFileName(oldLogo.name);
      const safeNewFileName = sanitizeFileName(newLogo.name);
      const oldLogoPath = `sweeps/${timestamp}_old_${safeOldFileName}`;
      const newLogoPath = `sweeps/${timestamp}_new_${safeNewFileName}`;

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
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <div className="overflow-hidden rounded-xl bg-primary p-8 text-primary-foreground">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-heading-xl">Brand Sweep</h2>
              <p className="max-w-[600px] text-body-md text-primary-foreground/80">
                Scan the web for outdated brand usage and maintain brand consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section>
        <div className="card mb-6">
        <h2 className="text-heading-lg mb-4">Upload Logos</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Old Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleOldLogoChange}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
              disabled={loading}
            />
            {oldLogo && (
              <p className="text-xs text-muted-foreground mt-1">Selected: {oldLogo.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New/Current Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleNewLogoChange}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
              disabled={loading}
            />
            {newLogo && (
              <p className="text-xs text-muted-foreground mt-1">Selected: {newLogo.name}</p>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Maximum file size: 10MB per file</p>
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          {loading && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary">
                  {sweepStatus === "uploading" ? "Uploading logos..." : "Running sweep..."}
                </span>
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
            onClick={handleRunSweep}
            disabled={loading || !oldLogo || !newLogo}
            className="btn-primary w-full"
          >
            {loading ? "Running Sweep..." : "Run Sweep"}
          </button>
        </div>
      </div>
      </section>

      {/* Results Section */}
      {results && results.length > 0 && (
        <section>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-lg">Sweep Results</h2>
              <span className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive text-label-md font-medium">
                {results.length} issues found
              </span>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-12 text-sm font-medium">
                <div className="col-span-4">URL</div>
                <div className="col-span-3">Detected Asset</div>
                <div className="col-span-2">Action</div>
                <div className="col-span-3">Confidence</div>
              </div>
              <div className="divide-y">
                {results.map((site, index) => (
                  <div
                    key={index}
                    className="p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0 hover:bg-accent/50 transition-colors"
                  >
                    <div className="col-span-4 w-full md:w-auto">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        {site.url}
                      </a>
                    </div>
                    <div className="col-span-3 text-sm text-foreground">{site.asset}</div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 rounded-lg bg-warning-light text-warning-foreground text-label-sm font-medium">
                        {site.action}
                      </span>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      {Math.round(site.confidence * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {results && results.length === 0 && (
        <section>
          <div className="card">
            <div className="text-center py-12">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-heading-sm mb-2">No Issues Found</p>
              <p className="text-body-md text-muted-foreground">
                No outdated brand usage detected. Your brand is consistent!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}




