import React, { useState } from "react";
import { storage, db } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { sanitizeFileName } from "../utils/security";
import { Sparkles, Link, Check, Info, Scan } from "lucide-react";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function BrandSweep() {
  const { user } = useAuth();
  const [oldLogo, setOldLogo] = useState(null);
  const [newLogo, setNewLogo] = useState(null);
  const [pageUrl, setPageUrl] = useState("");
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

  function handlePageUrlChange(e) {
    setError(null);
    setPageUrl(e.target.value);
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
    
    // Validate: either URL OR both logos must be provided
    const hasUrl = pageUrl && pageUrl.trim().length > 0;
    const hasLogos = oldLogo && newLogo;
    
    if (!hasUrl && !hasLogos) {
      setError("Please enter a URL to scan or upload both old and new logos.");
      return;
    }

    // If URL is provided, validate it's a valid URL
    if (hasUrl) {
      try {
        new URL(pageUrl.trim());
      } catch (err) {
        setError("Please enter a valid URL (e.g., https://www.yourwebsite.com)");
        return;
      }
    }

    if (!storage || !db) {
      setError("Firebase not configured. Please set up .env.local with Firebase credentials.");
      return;
    }

    setLoading(true);
    setSweepStatus(hasLogos ? "uploading" : "running");
    setProgress(0);

    try {
      let oldLogoUrl = null;
      let newLogoUrl = null;

      // If logos are provided, upload them
      if (hasLogos) {
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
        oldLogoUrl = await getDownloadURL(oldUploadTask.snapshot.ref);

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
        newLogoUrl = await getDownloadURL(newUploadTask.snapshot.ref);
        setProgress(70);
      }

      setSweepStatus("running");
      if (!hasLogos) {
        setProgress(30);
      }

      // Simulate API call with 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setProgress(100);

      // Generate mock results
      const detectedSites = generateMockResults();

      // Save sweep results to Firestore
      const sweepData = {
        initiatedBy: user.uid,
        pageUrl: hasUrl ? pageUrl.trim() : null,
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

  // Determine if button should be disabled
  const hasUrl = pageUrl && pageUrl.trim().length > 0;
  const hasLogos = oldLogo && newLogo;
  const canRunSweep = hasUrl || hasLogos;
  const isButtonDisabled = loading || !canRunSweep;

  return (
    <main className="flex-1 overflow-y-auto bg-background scroll-smooth">
      <div className="max-w-4xl mx-auto w-full pt-16 pb-20 px-6 flex flex-col items-center">
        {/* Hero Section */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center size-14 bg-card rounded-2xl mb-5 text-primary shadow-sm border border-border">
            <Sparkles className="text-3xl fill-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            AI Brand Sweep
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Scan a page to review brand asset usage.
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="p-8 md:p-10 border-b border-border bg-muted/50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Run a Brand Sweep</h2>
              <p className="text-muted-foreground text-sm">Enter a URL to scan for logo and color usage.</p>
            </div>
            <div className="hidden sm:block">
              <Scan className="text-muted-foreground/50 text-4xl" />
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8 md:p-10 flex flex-col gap-8">
            {/* URL Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground" htmlFor="scan-url">
                Page URL
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link className="text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all shadow-sm outline-none font-medium"
                  id="scan-url"
                  placeholder="https://www.yourwebsite.com"
                  type="url"
                  value={pageUrl}
                  onChange={handlePageUrlChange}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-muted-foreground">Start with your homepage or key landing pages.</p>
            </div>

            {/* File Upload Options (Alternative to URL) */}
            <div className="flex flex-col gap-4 pt-2 border-t border-border">
              <p className="text-sm font-semibold text-foreground">Or upload logos to compare</p>
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
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Loading/Progress Indicator */}
            {loading && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-primary">
                    {sweepStatus === "uploading" ? "Uploading logos..." : "Running sweep..."}
                  </span>
                  <span className="text-sm font-medium text-primary">{progress}%</span>
                </div>
                <div className="w-full bg-primary/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Two Column Layout: What Will Be Checked + How it works */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-2">
              {/* What Will Be Checked */}
              <div className="flex-1">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">What Will Be Checked</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-success-light dark:bg-success/20 flex items-center justify-center text-success shrink-0 border border-success/30">
                      <Check className="text-[16px] font-bold h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Logo usage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-success-light dark:bg-success/20 flex items-center justify-center text-success shrink-0 border border-success/30">
                      <Check className="text-[16px] font-bold h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Color usage</span>
                  </li>
                </ul>
              </div>

              {/* How it works */}
              <div className="flex-1">
                <div className="bg-info-light dark:bg-info/10 rounded-xl p-5 border border-info/20 h-full">
                  <div className="flex gap-4">
                    <Info className="text-info shrink-0 mt-0.5 h-5 w-5" />
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-sm font-bold text-info-foreground">How it works</h4>
                      <p className="text-xs text-info-foreground/80 leading-relaxed">
                        The sweep scans the selected page, detects logos and colors, and highlights inconsistencies against your brand guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer with Button */}
          <div className="pt-4 border-t border-border mt-2 px-8 md:px-10 pb-8 md:pb-10">
            <button
              onClick={handleRunSweep}
              disabled={isButtonDisabled}
              className={`w-full md:w-auto md:min-w-[200px] py-4 px-8 font-bold rounded-lg border border-transparent transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wide ${
                isButtonDisabled
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm"
              }`}
            >
              <Scan className="text-[20px] h-5 w-5" />
              Run Sweep
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results && results.length > 0 && (
          <div className="w-full mt-8 bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Sweep Results</h2>
                <span className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                  {results.length} issues found
                </span>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-12 text-sm font-medium text-foreground">
                  <div className="col-span-4">URL</div>
                  <div className="col-span-3">Detected Asset</div>
                  <div className="col-span-2">Action</div>
                  <div className="col-span-3">Confidence</div>
                </div>
                <div className="divide-y divide-border">
                  {results.map((site, index) => (
                    <div
                      key={index}
                      className="p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0 hover:bg-muted/50 transition-colors"
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
                        <span className="px-2 py-1 rounded-lg bg-warning-light text-warning-foreground text-xs font-medium border border-warning/30">
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
          </div>
        )}

        {/* No Results Found */}
        {results && results.length === 0 && (
          <div className="w-full mt-8 bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-xl font-bold text-foreground mb-2">No Issues Found</p>
                <p className="text-sm text-muted-foreground">
                  No outdated brand usage detected. Your brand is consistent!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
