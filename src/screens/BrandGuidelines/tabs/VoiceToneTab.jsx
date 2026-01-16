import React from "react";
import { CheckCircle, X, Megaphone, ToggleRight, Headphones, Badge } from "lucide-react";

export default function VoiceToneTab() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      {/* Voice Principles */}
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-foreground">Voice Principles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Clear", desc: "No jargon allowed." },
            { label: "Human", desc: "Talk like a person." },
            { label: "Direct", desc: "Respect their time." },
          ].map((principle, idx) => (
            <div key={idx} className="px-5 py-4 bg-card border border-border rounded-lg shadow-sm flex flex-col gap-1">
              <span className="font-bold text-foreground">{principle.label}</span>
              <span className="text-xs text-muted-foreground">{principle.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Do's and Don'ts */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-xl p-6 md:p-8 border border-l-4 border-l-green-500 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6">
            <span className="flex items-center justify-center size-6 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">
              <CheckCircle className="h-3 w-3" />
            </span>
            Do this
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Write clearly and directly, getting straight to the point.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Use plain language that anyone can understand.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Sound human and empathetic, not like a corporation.</span>
            </li>
          </ul>
        </div>
        <div className="bg-card rounded-xl p-6 md:p-8 border border-l-4 border-l-red-500 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6">
            <span className="flex items-center justify-center size-6 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
              <X className="h-3 w-3" />
            </span>
            Don't do this
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Use insider jargon, buzzwords, or acronyms without explaining.</span>
            </li>
            <li className="flex gap-3">
              <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Overcomplicate explanations to sound "smart".</span>
            </li>
            <li className="flex gap-3">
              <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Sound robotic, cold, or overly casual (e.g. "hey guys").</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Tone by Context */}
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-foreground">Tone by Context</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Megaphone, title: "Marketing", tone: "Bold & Inspiring", desc: "Focus on the vision and the value we bring. Inspire them to act.", color: "blue" },
            { icon: ToggleRight, title: "Product UI", tone: "Clear & Concise", desc: "Get out of the way. Guide the user efficiently without friction.", color: "purple" },
            { icon: Headphones, title: "Support", tone: "Calm & Helpful", desc: "Be reassuring. Acknowledge the problem and offer the solution.", color: "emerald" },
            { icon: Badge, title: "Internal", tone: "Professional & Friendly", desc: "Be direct but warm. We're all on the same team.", color: "orange" },
          ].map((context, idx) => {
            const getColorClasses = (color) => {
              const classes = {
                blue: {
                  bg: "bg-blue-50 dark:bg-blue-900/20",
                  text: "text-blue-600 dark:text-blue-400",
                  border: "hover:border-blue-300 dark:hover:border-blue-700",
                },
                purple: {
                  bg: "bg-purple-50 dark:bg-purple-900/20",
                  text: "text-purple-600 dark:text-purple-400",
                  border: "hover:border-purple-300 dark:hover:border-purple-700",
                },
                emerald: {
                  bg: "bg-emerald-50 dark:bg-emerald-900/20",
                  text: "text-emerald-600 dark:text-emerald-400",
                  border: "hover:border-emerald-300 dark:hover:border-emerald-700",
                },
                orange: {
                  bg: "bg-orange-50 dark:bg-orange-900/20",
                  text: "text-orange-600 dark:text-orange-400",
                  border: "hover:border-orange-300 dark:hover:border-orange-700",
                },
              };
              return classes[color] || classes.blue;
            };
            const colors = getColorClasses(context.color);
            return (
              <div key={idx} className={`p-6 bg-card border border-border rounded-xl transition-colors ${colors.border}`}>
                <div className={`size-10 rounded-lg flex items-center justify-center mb-4 ${colors.bg} ${colors.text}`}>
                  <context.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-foreground mb-1">{context.title}</h4>
                <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${colors.text}`}>
                  {context.tone}
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{context.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
