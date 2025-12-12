import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export default function Dashboard() {
  const [totalAssets, setTotalAssets] = useState(0);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    
    const assetsRef = collection(db, "assets");
    const qRecent = query(assetsRef, orderBy("uploadedAt", "desc"), limit(5));

    // total assets count via snapshot (not optimal for large collections but fine for PoC)
    const unsubTotal = onSnapshot(assetsRef, (snap) => {
      setTotalAssets(snap.size);
    }, (error) => {
      console.error("Error loading assets:", error);
      setLoading(false);
    });

    const unsubRecent = onSnapshot(qRecent, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecent(items);
      setLoading(false);
    }, (error) => {
      console.error("Error loading recent assets:", error);
      setLoading(false);
    });

    return () => {
      unsubTotal();
      unsubRecent();
    };
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Overview of your brand assets and activity</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="metric-card">
          <div className="text-sm font-medium text-gray-400 mb-2">Total Assets</div>
          <div className="text-4xl font-bold text-blue-400">{totalAssets}</div>
        </div>
        <div className="metric-card">
          <div className="text-sm font-medium text-gray-400 mb-2">Recent Activity</div>
          <div className="text-4xl font-bold text-green-400">{recent.length}</div>
        </div>
        <div className="metric-card">
          <div className="text-sm font-medium text-gray-400 mb-2">Last Sweep</div>
          <div className="text-4xl font-bold text-gray-400">N/A</div>
        </div>
      </div>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4">Recent Uploads</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : recent.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No assets uploaded yet. Upload your first asset to get started!
          </div>
        ) : (
          <ul className="space-y-3">
            {recent.map((r) => (
              <li key={r.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-100">{r.name}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {r.category} • {r.fileType}
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded-full">
                    {r.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
