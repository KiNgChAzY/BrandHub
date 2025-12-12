import React from "react";
import { useParams } from "react-router-dom";

export default function ShareBrandPage() {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Shared Brand Page</h1>
      <p className="text-gray-600 mb-8">Public brand guidelines view</p>
      
      <div className="card">
        <p className="text-gray-600">Share ID: {id}</p>
        <p className="text-gray-600 mt-4">This is a public view of brand assets.</p>
      </div>
    </div>
  );
}



