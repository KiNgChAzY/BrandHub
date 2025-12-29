import React from "react";
import { useParams } from "react-router-dom";

export default function ShareBrandPage() {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-heading-xl mb-2">Shared Brand Page</h1>
      {/* MVP: Placeholder text - update with actual content later */}
      <p className="text-body-md text-muted-foreground mb-8">Public brand guidelines view</p>
      
      <div className="card">
        {/* MVP: Placeholder content - update with actual share page content later */}
        <p className="text-body-md text-muted-foreground">Share ID: {id}</p>
        <p className="text-body-md text-muted-foreground mt-4">This is a public view of brand assets.</p>
      </div>
    </div>
  );
}




