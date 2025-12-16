import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { FileText } from "lucide-react";

export default function AssetLibrary() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (mounted) setAssets(list);
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

  if (loading) {
    return (
      <div className="card">
        <div className="text-center py-12 text-muted-foreground">Loading assets…</div>
      </div>
    );
  }

  if (!assets.length) {
    return (
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Asset Library</h1>
        <p className="text-muted-foreground mb-6">Browse and download your brand assets</p>
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-2xl">
          No assets found. Upload your first asset to get started!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Asset Library</h2>
              <p className="max-w-[600px] text-white/80">
                Browse, manage, and download all your brand assets in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium">
                Filter
              </button>
              <button className="px-4 py-2 rounded-2xl bg-white text-blue-700 hover:bg-white/90 font-medium">
                Upload New
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Assets Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">All Assets</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-2xl text-sm border border-border hover:bg-muted">
              Sort
            </button>
            <button className="px-3 py-1 rounded-2xl text-sm border border-border hover:bg-muted">
              View
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((a) => (
            <div
              key={a.id}
              className="card overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-2xl">
                    {a.category || "uncategorized"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                  {a.name || a.filename || "Untitled"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {a.fileType || "file"}
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={a.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-4 py-2 rounded-2xl bg-primary/10 text-primary text-sm font-medium text-center hover:bg-primary/20 transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



