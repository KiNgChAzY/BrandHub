import React from "react";
import { Copy, Palette } from "lucide-react";

export default function ColorsTab() {
  const primaryColors = [
    // PLACEHOLDER: "Acme Blue" color data - replace with actual brand colors from database
    { name: "Acme Blue", hex: "#135BEC", rgb: "19, 91, 236", cmyk: "80, 50, 0, 0", bg: "bg-primary" },
    { name: "Midnight", hex: "#101622", rgb: "16, 22, 34", cmyk: "80, 70, 60, 80", bg: "bg-[#101622]" },
    { name: "Pure White", hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0", bg: "bg-white", checkered: true },
  ];

  const accentColors = [
    { name: "Sky", hex: "#3B82F6", bg: "bg-[#3b82f6]" },
    { name: "Success", hex: "#10B981", bg: "bg-[#10b981]" },
    { name: "Danger", hex: "#F43F5E", bg: "bg-[#f43f5e]" },
    { name: "Warning", hex: "#F59E0B", bg: "bg-[#f59e0b]" },
    { name: "Slate", hex: "#64748B", bg: "bg-[#64748b]" },
    { name: "Purple", hex: "#8B5CF6", bg: "bg-[#8b5cf6]" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Primary Color Palette */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-foreground">Primary Color Palette</h3>
            <p className="text-sm text-muted-foreground">Primary colors should be used in most brand applications.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryColors.map((color, idx) => (
            <div key={idx} className="group flex flex-col rounded-2xl overflow-hidden border border-border shadow-sm bg-card hover:shadow-md transition-shadow">
              <div className={`h-48 w-full ${color.bg} relative ${color.checkered ? "border-b border-border" : ""}`}>
                {color.checkered && (
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
                )}
                {!color.checkered && <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>}
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-foreground">{color.name}</h4>
                  {/* PLACEHOLDER: Copy button - implement copy-to-clipboard functionality */}
                  <button className="text-muted-foreground hover:text-primary transition-colors" title="Copy HEX">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">HEX</span>
                    <span className="font-mono text-foreground bg-muted px-2 py-0.5 rounded">{color.hex}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">RGB</span>
                    <span className="font-mono text-muted-foreground">{color.rgb}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">CMYK</span>
                    <span className="font-mono text-muted-foreground">{color.cmyk}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary & Accent Colors */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground">Secondary & Accent Colors</h3>
          <p className="text-sm text-muted-foreground">Accent colors are used sparingly for emphasis and highlights.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {accentColors.map((color, idx) => (
            <div key={idx} className="flex flex-col rounded-xl overflow-hidden border border-border shadow-sm bg-card">
              <div className={`h-24 w-full ${color.bg}`}></div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-semibold text-foreground">{color.name}</h5>
                  <button className="text-muted-foreground hover:text-primary">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{color.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
