import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

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
        <div className="text-center py-12 text-gray-400">Loading assets…</div>
      </div>
    );
  }

  if (!assets.length) {
    return (
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Asset Library</h1>
        <p className="text-gray-400 mb-6">Browse and download your brand assets</p>
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-700 rounded-lg">
          No assets found. Upload your first asset to get started!
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Asset Library</h1>
      <p className="text-gray-400 mb-8">Browse and download your brand assets</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((a) => (
          <div key={a.id} className="card hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-100 line-clamp-2">
                    {a.name || a.filename || "Untitled"}
                  </h3>
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded-full whitespace-nowrap">
                    {a.category || "uncategorized"}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  {a.fileType || "file"}
                </div>
              </div>
              <a
                href={a.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full text-center text-sm"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
