import React from "react";
import { CheckCircle, X } from "lucide-react";

export default function ImageryTab() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Photography Style */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Photography Style</h3>
          <span className="text-sm font-medium text-muted-foreground">Approved Assets</span>
        </div>
        <p className="text-sm text-muted-foreground border-l-4 border-primary pl-3 py-0.5">
          Photography should feel natural, candid, and human — never staged or stock-heavy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-muted">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Do's & Don'ts */}
      <section className="flex flex-col gap-8">
        <h3 className="text-xl font-bold text-foreground">Do's & Don'ts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-green-100 dark:bg-emerald-500/15 text-green-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle className="h-3 w-3 font-bold" />
              </div>
              <span className="text-base font-bold text-green-700 dark:text-emerald-400 uppercase tracking-wide">Do</span>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border-4 border-green-500/10 dark:border-green-500/20 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">✓</span>
              </div>
              <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                Approved
              </div>
            </div>
            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                Use natural lighting to create warmth.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                Capture authentic, unposed moments.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                Favor clean backgrounds that don't distract.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-full bg-red-100 dark:bg-rose-500/15 text-red-600 dark:text-rose-400 flex items-center justify-center">
                <X className="h-3 w-3 font-bold" />
              </div>
              <span className="text-base font-bold text-red-700 dark:text-rose-400 uppercase tracking-wide">Don't</span>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border-4 border-red-500/10 dark:border-red-500/20 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center grayscale opacity-80">
                <span className="text-6xl">✗</span>
              </div>
              <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                <div className="bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg transform -rotate-6 border-2 border-white">
                  REJECTED
                </div>
              </div>
            </div>
            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-3 text-sm text-muted-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <X className="h-5 w-5 text-red-500 shrink-0" />
                Use overly staged, generic stock photos.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <X className="h-5 w-5 text-red-500 shrink-0" />
                Apply heavy, unnatural filters or effects.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground px-2 py-1.5 rounded border border-black/20 dark:border-white/20">
                <X className="h-5 w-5 text-red-500 shrink-0" />
                Use cluttered scenes that hide the subject.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
