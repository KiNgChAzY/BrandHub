import React from "react";
import { CheckCircle, X, Search, Home, Settings, User, Bell, Mail, Calendar, Folder, Upload, Heart, ShoppingCart, MessageCircle } from "lucide-react";

export default function IconographyTab() {
  const icons = [
    Search, Home, Settings, User, Bell, Mail, Calendar, Folder, Upload, Heart, ShoppingCart, MessageCircle
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Visual Style */}
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-foreground">Visual Style</h3>
        <p className="text-sm text-muted-foreground">Icons should be consistent, minimal, and aligned with our brand aesthetic.</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Outline style", dot: "bg-gray-400" },
            { label: "2px stroke weight", dot: "bg-gray-400" },
            { label: "Rounded corners", dot: "bg-gray-400" },
            { label: "Consistent stroke weight", dot: "bg-gray-400" },
          ].map((item, idx) => (
            <div key={idx} className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${item.dot}`}></span>
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Icon Set */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold text-foreground">Icon Set</h4>
          <span className="text-sm text-muted-foreground font-medium hidden sm:block">All icons should follow this visual style.</span>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4">
          {icons.map((Icon, idx) => (
            <div key={idx} className="aspect-square rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-all">
              <Icon className="h-8 w-8" />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Usage Guidelines */}
      <section className="flex flex-col gap-6">
        <h4 className="text-xl font-bold text-foreground">Usage Guidelines</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-green-200 dark:border-emerald-500/20 bg-green-50/50 dark:bg-emerald-500/8 p-6">
            <div className="flex items-center gap-2 text-green-700 dark:text-emerald-400 font-bold uppercase tracking-wide text-xs">
              <CheckCircle className="h-4 w-4" />
              Do
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <span className="size-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                Use icons from the approved set only.
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <span className="size-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                Maintain consistent stroke weight (2px).
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <span className="size-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                Use brand colors where appropriate for emphasis.
              </li>
            </ul>
            <div className="mt-2 p-4 bg-card rounded-lg border border-green-100 dark:border-emerald-500/20 flex items-center justify-center gap-8">
              <Settings className="h-12 w-12 text-muted-foreground" />
              <Heart className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-black/30 dark:border-white/30 bg-red-50/50 dark:bg-rose-500/8 p-6">
            <div className="flex items-center gap-2 text-red-700 dark:text-rose-400 font-bold uppercase tracking-wide text-xs border-b border-black/30 dark:border-white/30 pb-2">
              <X className="h-4 w-4" />
              Don't
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <span className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                Mix icon styles (e.g. filled and outline).
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <span className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                Fill outline icons arbitrarily.
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <span className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                Use icons with mismatched stroke widths.
              </li>
            </ul>
            <div className="mt-2 p-4 bg-card rounded-lg border border-black/30 dark:border-white/30 flex items-center justify-center gap-8 opacity-50">
              <Settings className="h-12 w-12 text-muted-foreground" />
              <Settings className="h-12 w-12 text-muted-foreground fill-current" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
