import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export default function AssetLibrary() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <div>Loading assets…</div>;

  if (!assets.length) return <div>No assets found.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Asset Library</h1>
      <ul className="space-y-2">
        {assets.map((a) => (
          <li key={a.id} className="p-3 border rounded-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{a.name || a.filename || "Untitled"}</div>
                <div className="text-sm text-gray-500">{a.category || "uncategorized"}</div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={a.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400"
                >
                  Download
                </a>
                <div className="text-xs text-gray-400">{a.fileType || "file"}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
