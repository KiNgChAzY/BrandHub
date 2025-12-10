import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [totalAssets, setTotalAssets] = useState(0);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assetsRef = collection(db, "assets");
    const qRecent = query(assetsRef, orderBy("uploadedAt", "desc"), limit(5));

    // total assets count via snapshot (not optimal for large collections but fine for PoC)
    const unsubTotal = onSnapshot(assetsRef, (snap) => {
      setTotalAssets(snap.size);
    });

    const unsubRecent = onSnapshot(qRecent, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecent(items);
      setLoading(false);
    });

    return () => {
      unsubTotal();
      unsubRecent();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-sm text-gray-400">Total Assets</div>
          <div className="text-3xl">{totalAssets}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-sm text-gray-400">Recent Activity</div>
          <div className="text-3xl">{recent.length}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-sm text-gray-400">Last Sweep</div>
          <div className="text-3xl">N/A</div>
        </div>
      </div>

      <section>
        <h2 className="text-xl mb-2">Recent Uploads</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-2">
            {recent.map((r) => (
              <li key={r.id} className="p-3 bg-gray-900 rounded">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-gray-400">{r.category} • {r.fileType}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
