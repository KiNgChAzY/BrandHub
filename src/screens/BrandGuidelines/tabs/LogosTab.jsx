import React from "react";
import { CheckCircle, X, Copy, Database } from "lucide-react";

export default function LogosTab() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Primary Logo */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-foreground">Primary Logo</h3>
            <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">
              Approved
            </span>
          </div>
          <span className="text-sm text-muted-foreground hidden sm:block">Use this logo whenever possible.</span>
        </div>
        <div className="relative w-full aspect-[2/1] md:aspect-[3/1] rounded-2xl border border-border bg-card flex items-center justify-center overflow-hidden shadow-sm group">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>
          <div className="relative z-10 flex items-center gap-4 text-foreground transform group-hover:scale-105 transition-transform duration-500">
            <div className="size-12 md:size-16 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <Database className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            {/* PLACEHOLDER: "Acme Global" - replace with actual brand name */}
            <span className="text-3xl md:text-5xl font-extrabold tracking-tight">Acme Global</span>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="px-3 py-1 bg-card/90 backdrop-blur rounded text-xs font-medium text-muted-foreground shadow-sm border border-border">
              SVG / PNG
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground sm:hidden">Use this logo whenever possible.</p>
      </section>

      {/* Alternate Logos */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground">Alternate & Secondary Logos</h3>
          <p className="text-sm text-muted-foreground">Use alternate logos only when the primary logo does not fit the layout.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Horizontal", icon: Database, layout: "horizontal", bg: "bg-card" },
            { label: "Stacked", icon: Database, layout: "stacked", bg: "bg-card" },
            { label: "Icon / Mark", icon: Database, layout: "icon", bg: "bg-card" },
            { label: "Light version", icon: Database, layout: "light", bg: "bg-[#101622]" },
            { label: "Dark version", icon: Database, layout: "dark", bg: "bg-white" },
          ].map((logo, idx) => (
            <div key={idx} className="flex flex-col gap-3 group cursor-default">
              <div className={`aspect-video ${logo.bg} rounded-lg border border-border flex items-center justify-center p-4 hover:border-primary/50 transition-colors`}>
                {logo.layout === "icon" ? (
                  <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                    <logo.icon className="h-6 w-6" />
                  </div>
                ) : logo.layout === "stacked" ? (
                  <div className="flex flex-col items-center gap-1 text-foreground scale-75">
                    <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                      <logo.icon className="h-5 w-5" />
                    </div>
                    {/* PLACEHOLDER: "Acme" - replace with actual brand name */}
                    <span className="text-sm font-bold tracking-tight">Acme</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-foreground scale-75">
                    <div className="size-6 bg-primary rounded flex items-center justify-center text-white shadow-sm">
                      <logo.icon className="h-4 w-4" />
                    </div>
                    {/* PLACEHOLDER: "Acme" - replace with actual brand name */}
                    <span className="text-lg font-bold tracking-tight">Acme</span>
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-foreground text-center">{logo.label}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Do's and Don'ts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center size-6 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">
              <CheckCircle className="h-3 w-3 font-bold" />
            </span>
            Do
          </h3>
          <div className="grid gap-4">
            {[
              { icon: CheckCircle, title: "Use approved versions", desc: "Only use the logo files provided in this guide. Do not recreate." },
              { icon: CheckCircle, title: "Maintain clear space", desc: "Ensure there is enough breathing room around the logo." },
              { icon: CheckCircle, title: "Match logo to background", desc: "Use the light logo on dark backgrounds and vice-versa." },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30">
                <div className="bg-card p-2 rounded-lg shadow-sm shrink-0 border border-green-100 dark:border-green-800/30">
                  <item.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-green-900 dark:text-green-300 mb-0.5">{item.title}</h4>
                  <p className="text-xs text-green-800/70 dark:text-green-400/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center size-6 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
              <X className="h-3 w-3 font-bold" />
            </span>
            Don't
          </h3>
          <div className="grid gap-4">
            {[
              { icon: X, title: "Stretch or distort", desc: "Never change the proportions of the logo elements." },
              { icon: X, title: "Change colors", desc: "Do not apply unauthorized colors or gradients." },
              { icon: X, title: "Add effects", desc: "Avoid shadows, outlines, or other decorative effects." },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
                <div className="bg-card p-2 rounded-lg shadow-sm shrink-0 border border-red-100 dark:border-red-800/30">
                  <item.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-red-900 dark:text-red-300 mb-0.5">{item.title}</h4>
                  <p className="text-xs text-red-800/70 dark:text-red-400/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
