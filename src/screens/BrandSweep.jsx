import React from "react";

export default function BrandSweep() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Brand Sweep</h1>
      <p className="text-gray-400 mb-8">Scan the web for outdated brand usage</p>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Upload Logos</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Old Logo</label>
            <input type="file" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New/Current Logo</label>
            <input type="file" className="input" />
          </div>
          <button className="btn-primary">Run Sweep</button>
        </div>
      </div>
    </div>
  );
}


