import React from "react";

export default function TypographyShowcase() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Typography</h1>
      <p className="text-gray-400 mb-8">Brand typography and font guidelines</p>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Font Families</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Heading Font</h3>
            <p className="text-2xl">Sample Heading Text</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Body Font</h3>
            <p className="text-base">Sample body text for reading and content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


