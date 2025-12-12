import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function ColorPalette() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    let mounted = true;
    async function loadColors() {
      try {
        const q = query(
          collection(db, "assets"),
          where("category", "==", "color"),
          orderBy("uploadedAt", "desc")
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) setColors(list);
      } catch (err) {
        console.error("Error loading colors:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadColors();
    return () => {
      mounted = false;
    };
  }, []);

  // Helper function to get color value from metadata
  function getColorValue(color) {
    const meta = color.metadata || {};
    return meta.hex || meta.rgb || meta.color || "#000000";
  }

  // Helper function to determine text color (white or black) based on background
  function getTextColor(hex) {
    if (!hex || !hex.startsWith("#")) return "text-gray-900";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "text-gray-900" : "text-gray-900";
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
        <p className="text-gray-600 mb-8">Brand color guidelines and swatches</p>
        <div className="card">
          <div className="text-center py-12 text-gray-600">Loading colors…</div>
        </div>
      </div>
    );
  }

  if (!colors.length) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
        <p className="text-gray-600 mb-8">Brand color guidelines and swatches</p>
        <div className="card">
          <div className="text-center py-12 text-gray-600 border-2 border-dashed border-gray-200 rounded-lg">
            No color assets found. Upload color assets to see them here.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
      <p className="text-gray-600 mb-8">Brand color guidelines and swatches</p>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Brand Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.map((color) => {
            const colorValue = getColorValue(color);
            const textColor = getTextColor(colorValue);
            const meta = color.metadata || {};
            
            return (
              <div
                key={color.id}
                className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: colorValue }}
              >
                <div className={`p-4 ${textColor}`}>
                  <div className="font-semibold mb-2">{color.name || "Unnamed Color"}</div>
                  <div className="space-y-1 text-sm opacity-90">
                    {meta.hex && <div>HEX: {meta.hex}</div>}
                    {meta.rgb && <div>RGB: {meta.rgb}</div>}
                    {meta.cmyk && <div>CMYK: {meta.cmyk}</div>}
                    {!meta.hex && !meta.rgb && !meta.cmyk && (
                      <div className="opacity-75">No color values specified</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



