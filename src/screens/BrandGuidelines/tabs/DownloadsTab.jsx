import React from "react";
import { Download, FolderArchive, Layers, Globe, Printer } from "lucide-react";

export default function DownloadsTab() {
  // PLACEHOLDER: Download packages data - replace with actual downloadable assets from database
  const downloads = [
    {
      icon: FolderArchive,
      title: "Full Brand Kit",
      desc: "The complete package of all official brand assets, including logos, fonts, and guidelines.",
      updated: "Updated Oct 24", // PLACEHOLDER: Update date - connect to actual file update timestamps
      tags: ["All Logos", "Brand Fonts", "PDF Guide"],
      size: "145 MB", // PLACEHOLDER: File size - connect to actual file sizes
      color: "blue",
    },
    {
      icon: Layers,
      title: "Logo Kit",
      desc: "All variations of the primary and secondary marks, including monochrome and reversed.",
      updated: "Updated Nov 02",
      tags: ["Primary Mark", "Lockups", "Wordmarks"],
      size: "42 MB",
      color: "indigo",
    },
    {
      icon: Globe,
      title: "Web Assets",
      desc: "Optimized digital assets for screen use, including favicons, OG images, and app icons.",
      updated: "Updated Oct 15",
      tags: ["Favicons", "Social Covers", "UI Kit"],
      size: "85 MB",
      color: "emerald",
    },
    {
      icon: Printer,
      title: "Print Assets",
      desc: "High-resolution vector files and CMYK color profiles designed for physical collateral.",
      updated: "Updated Sep 28",
      tags: ["Business Cards", "Letterhead", "CMYK Logos"],
      size: "210 MB",
      color: "orange",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-foreground">Download Packages</h3>
        <p className="text-sm text-muted-foreground">Download complete brand asset packages for your projects.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.map((item, idx) => {
            const getColorClasses = (color) => {
              const classes = {
                blue: {
                  bg: "bg-blue-50 dark:bg-blue-500/12",
                  text: "text-blue-600 dark:text-blue-400",
                  hover: "group-hover:border-blue-200 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/8",
                },
                indigo: {
                  bg: "bg-indigo-50 dark:bg-indigo-500/12",
                  text: "text-indigo-600 dark:text-indigo-400",
                  hover: "group-hover:border-indigo-200 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-500/8",
                },
                emerald: {
                  bg: "bg-emerald-50 dark:bg-emerald-500/12",
                  text: "text-emerald-600 dark:text-emerald-400",
                  hover: "group-hover:border-emerald-200 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-500/8",
                },
                orange: {
                  bg: "bg-orange-50 dark:bg-amber-500/12",
                  text: "text-orange-600 dark:text-amber-400",
                  hover: "group-hover:border-orange-200 group-hover:bg-orange-50/50 dark:group-hover:bg-amber-500/8",
                },
              };
              return classes[color] || classes.blue;
            };
            const colors = getColorClasses(item.color);
            return (
              <div key={idx} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={`size-12 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{item.updated}</span>
                </div>
                <h5 className="text-lg font-bold text-foreground mb-2">{item.title}</h5>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{item.desc}</p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-2 py-1 rounded bg-muted border border-border text-[11px] font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* PLACEHOLDER: Download button - implement actual file download functionality */}
                  <button className={`w-full py-2.5 rounded-lg border border-border font-semibold text-sm text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 ${colors.hover}`}>
                    <Download className="h-[18px] w-[18px]" />
                    Download ZIP ({item.size})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
