import React from "react";
import { CheckCircle, Info } from "lucide-react";

export default function TypographyTab() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Primary Typeface */}
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-4">Primary Typeface</h3>
        <div className="flex flex-col rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
          <div className="p-8 md:p-10 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-5xl font-bold text-foreground tracking-tight">Inter</h4>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold w-fit">
                  Primary Sans-Serif
                </span>
              </div>
              <div className="flex flex-col md:text-right gap-1">
                <span className="text-sm font-bold text-foreground">Usage</span>
                <span className="text-sm text-muted-foreground">Headlines, Body copy, UI text</span>
                <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium flex items-center md:justify-end gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Web Safe
                </div>
              </div>
            </div>
            <div className="py-10 border-y border-dashed border-border space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
                  The quick brown fox jumps over the lazy dog.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  Inter is a variable font family carefully crafted & designed for computer screens. It features a tall x-height to aid in readability of mixed-case and lower-case text.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Regular 400</span>
                  <p className="text-2xl text-foreground font-normal">Aa Bb Cc</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Medium 500</span>
                  <p className="text-2xl text-foreground font-medium">Aa Bb Cc</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Bold 700</span>
                  <p className="text-2xl text-foreground font-bold">Aa Bb Cc</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-[18px] w-[18px]" />
              Use Inter for all long-form reading and core interface elements to ensure maximum legibility.
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Typeface */}
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-4">Secondary Typeface</h3>
        <p className="text-sm text-muted-foreground -mt-2">Accent fonts should be used sparingly for emphasis.</p>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-border shadow-sm bg-card relative">
            <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-3xl font-bold text-foreground font-mono tracking-tight">Roboto Mono</h4>
                  <span className="text-xs font-mono text-muted-foreground mt-1 block">Monospace</span>
                </div>
                <span className="inline-flex px-2 py-1 rounded bg-muted border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Technical
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center py-4">
                <p className="text-xl md:text-2xl font-mono text-foreground">
                  10 PRINT "Hello World"<br />
                  20 GOTO 10
                </p>
              </div>
              <div className="border-t border-border pt-4 mt-auto">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Weights</span>
                    <div className="flex gap-3 text-sm font-mono text-foreground">
                      <span>Reg 400</span>
                      <span className="opacity-30">|</span>
                      <span>Med 500</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Usage</span>
                    <span className="text-sm text-muted-foreground">Code snippets, Data, Numbers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-muted rounded-xl border border-dashed border-border flex items-center justify-center p-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Info className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Do not use secondary fonts for body copy.</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />
    </div>
  );
}
