import React from "react";

export default function ColorPalette() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
      <p className="text-gray-400 mb-8">Brand color guidelines and swatches</p>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Primary Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-blue-600">
            <div className="text-white font-medium">Primary Blue</div>
            <div className="text-white/80 text-sm">#2563EB</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-gray-100 font-medium">Dark Gray</div>
            <div className="text-gray-400 text-sm">#1F2937</div>
          </div>
        </div>
      </div>
    </div>
  );
}


