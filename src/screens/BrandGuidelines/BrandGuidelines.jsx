import React, { useState } from "react";
import { Edit, Download, Share2 } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import LogosTab from "./tabs/LogosTab";
import ColorsTab from "./tabs/ColorsTab";
import TypographyTab from "./tabs/TypographyTab";
import ImageryTab from "./tabs/ImageryTab";
import VoiceToneTab from "./tabs/VoiceToneTab";
import IconographyTab from "./tabs/IconographyTab";
import DownloadsTab from "./tabs/DownloadsTab";
import ActivityTab from "./tabs/ActivityTab";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "logos", label: "Logos" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "imagery", label: "Imagery" },
  { id: "voice-tone", label: "Voice & Tone" },
  { id: "iconography", label: "Iconography" },
  { id: "downloads", label: "Downloads" },
  { id: "activity", label: "Activity", badge: "INT" },
];

export default function BrandGuidelines() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "logos":
        return <LogosTab />;
      case "colors":
        return <ColorsTab />;
      case "typography":
        return <TypographyTab />;
      case "imagery":
        return <ImageryTab />;
      case "voice-tone":
        return <VoiceToneTab />;
      case "iconography":
        return <IconographyTab />;
      case "downloads":
        return <DownloadsTab />;
      case "activity":
        return <ActivityTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header with Actions and Tabs */}
      <div className="sticky top-0 z-10 bg-background/95 dark:bg-card/95 backdrop-blur-sm border-b border-border px-6 md:px-12 pt-6">
        <div className="flex flex-col gap-4">
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            {/* PLACEHOLDER: Edit Guide button - implement guide editing functionality */}
            <button className="text-sm font-medium text-muted-foreground hover:text-primary dark:hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <Edit className="h-[18px] w-[18px]" />
              Edit Guide
            </button>
            <div className="h-4 w-px bg-border mx-1"></div>
            {/* PLACEHOLDER: Download Brand Guide button - implement PDF/download generation */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap">
              <Download className="h-5 w-5" />
              Download Brand Guide
            </button>
            {/* PLACEHOLDER: Share Brand Guide button - implement sharing functionality */}
            <button className="whitespace-nowrap shrink-0 flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm shadow-blue-200 dark:shadow-none transition-all transform active:scale-95 w-fit text-sm font-semibold">
              <Share2 className="h-5 w-5" />
              Share Brand Guide
            </button>
          </div>

          {/* Tab Navigation */}
          <nav aria-label="Tabs" className="flex gap-6 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 border-b-2 transition-colors whitespace-nowrap text-sm ${
                  activeTab === tab.id
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground font-medium"
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <span className="ml-1 bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}
