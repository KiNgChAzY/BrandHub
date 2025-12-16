import React from "react";
import { Layers, FileText, Download } from "lucide-react";

export default function Templates() {
  // Placeholder templates (will be replaced with real data later)
  const templates = [
    {
      name: "Brand Identity Package",
      description: "Complete brand design package with logos, colors, and typography",
      category: "Branding",
      popular: true,
    },
    {
      name: "Marketing Campaign",
      description: "Multi-channel marketing assets and templates",
      category: "Marketing",
      new: true,
    },
    {
      name: "Website Redesign",
      description: "Complete website design workflow and components",
      category: "Web",
      featured: true,
    },
    {
      name: "Product Launch",
      description: "Product launch campaign assets and templates",
      category: "Campaign",
      popular: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Templates</h2>
              <p className="max-w-[600px] text-white/80">
                Pre-designed templates and resources for your brand projects.
              </p>
            </div>
            <button className="px-4 py-2 rounded-2xl bg-white text-indigo-700 hover:bg-white/90 font-medium">
              Create Template
            </button>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Available Templates</h2>
          <button className="text-sm text-muted-foreground hover:text-primary">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {templates.map((template, index) => (
            <div
              key={index}
              className="card overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white flex items-center justify-center">
                <Layers className="h-12 w-12" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  {template.popular && (
                    <span className="px-2 py-1 text-xs rounded-xl bg-muted text-muted-foreground">
                      Popular
                    </span>
                  )}
                  {template.new && (
                    <span className="px-2 py-1 text-xs rounded-xl bg-chart-4/20 text-chart-4">
                      New
                    </span>
                  )}
                  {template.featured && (
                    <span className="px-2 py-1 text-xs rounded-xl bg-primary/10 text-primary">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs rounded-xl bg-muted text-muted-foreground">
                    {template.category}
                  </span>
                  <button className="px-3 py-1 rounded-xl text-sm hover:bg-muted font-medium">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State (if no templates) */}
      {templates.length === 0 && (
        <div className="card">
          <div className="text-center py-12">
            <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No templates available yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Upload your first template to get started!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}




