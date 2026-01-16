import React from "react";
import { Download, Share2, Layers, Palette, Type, ArrowRight, CheckCircle } from "lucide-react";

export default function OverviewTab() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Brand Summary */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-foreground">Brand Summary</h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {/* PLACEHOLDER: "Acme Global" - replace with actual brand name and description from database */}
            Acme Global represents the future of enterprise logistics. We are bold, reliable, and human-centric, bridging the gap between complex technology and simple solutions.
          </p>
        </div>
        {/* PLACEHOLDER: Brand attributes/tags - replace with actual brand attributes from database */}
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-blue-500"></span>
            Modern
          </div>
          <div className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-indigo-500"></span>
            Confident
          </div>
          <div className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500"></span>
            Trustworthy
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* Brand Snapshot */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Brand Snapshot</h3>
          {/* PLACEHOLDER: Last updated timestamp - connect to actual update tracking */}
          <span className="text-sm text-muted-foreground">Last updated today at 9:41 AM</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logos Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-500/12 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <div className="px-2 py-1 rounded bg-green-50 dark:bg-emerald-500/12 border border-green-100 dark:border-emerald-500/25 text-xs font-bold text-green-700 dark:text-emerald-400">
                Defined
              </div>
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">Logos</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Primary marks, monochrome variants, and app icons.
            </p>
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
              {/* PLACEHOLDER: Asset count - connect to actual asset count from database */}
              <span className="text-xs font-medium text-muted-foreground">4 Assets</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Colors Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-500/12 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Palette className="h-5 w-5" />
              </div>
              <div className="px-2 py-1 rounded bg-green-50 dark:bg-emerald-500/12 border border-green-100 dark:border-emerald-500/25 text-xs font-bold text-green-700 dark:text-emerald-400">
                Defined
              </div>
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">Colors</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Primary palette, secondary accents, and semantic colors.
            </p>
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="size-4 rounded-full bg-primary border border-card"></div>
                <div className="size-4 rounded-full bg-[#0d121b] dark:bg-white border border-card"></div>
                <div className="size-4 rounded-full bg-[#475569] border border-card"></div>
                <div className="size-4 rounded-full bg-[#f6f6f8] dark:bg-[#1f2937] border border-card"></div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Typography Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="size-10 rounded-lg bg-orange-50 dark:bg-amber-500/12 text-orange-600 dark:text-amber-400 flex items-center justify-center">
                <Type className="h-5 w-5" />
              </div>
              <div className="px-2 py-1 rounded bg-yellow-50 dark:bg-amber-500/12 border border-yellow-100 dark:border-amber-500/25 text-xs font-bold text-yellow-700 dark:text-amber-400">
                Missing
              </div>
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">Typography</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Web fonts, print fallbacks, and typesetting scale.
            </p>
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
              {/* PLACEHOLDER: Typography info - connect to actual typography data */}
              <span className="text-xs font-medium text-muted-foreground">Inter, System UI</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="bg-muted rounded-2xl p-8 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-foreground">Ready to share your brand?</h3>
          <p className="text-sm text-muted-foreground">Give your team or partners access to the latest assets.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm">
            <Download className="h-5 w-5" />
            Download Brand Guide
          </button>
          <button className="w-full sm:w-auto whitespace-nowrap shrink-0 flex justify-center items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-sm shadow-blue-200 dark:shadow-none transition-all transform active:scale-95 text-sm font-semibold">
            <Share2 className="h-5 w-5" />
            Share Brand Guide
          </button>
        </div>
      </section>

      <div className="h-12"></div>
    </div>
  );
}
