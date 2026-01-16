import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Home,
  Grid,
  Wand2,
  Settings,
  ChevronDown,
  X,
  CheckCircle,
  Users,
  Plus,
  Check,
  User,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }) {
  const location = useLocation();
  const { user, role } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const [brandName, setBrandName] = useState("");
  const [brandSelectorOpen, setBrandSelectorOpen] = useState(false);

  // Load brand name from user profile
  useEffect(() => {
    if (!user || !db) {
      setBrandName("Example Brand"); // PLACEHOLDER: Replace with actual brand name from user data
      return;
    }

    const loadBrandName = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setBrandName(userData.brandName || "Example Brand");
        } else {
          setBrandName("Example Brand"); // PLACEHOLDER: Replace with actual brand name from user data
        }
      } catch (err) {
        console.error("Error loading brand name:", err);
        setBrandName("Example Brand"); // PLACEHOLDER: Replace with actual brand name from user data
      }
    };

    loadBrandName();
  }, [user]);

  const toggleExpanded = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Get initials for brand avatar
  const getBrandInitials = (name) => {
    if (!name || name === "Example Brand") return "EB"; // PLACEHOLDER: "Example Brand" is placeholder text
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const BrandSelector = () => (
    <div className="relative z-20">
      <details
        className="group relative"
        open={brandSelectorOpen}
        onToggle={(e) => setBrandSelectorOpen(e.target.open)}
      >
        <summary className="flex items-center justify-between w-full p-2.5 rounded-xl border border-border bg-card hover:border-primary/50 cursor-pointer transition-all shadow-sm outline-none list-none">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground shrink-0 shadow-inner border border-white/10">
              <span className="font-bold text-sm tracking-tight">{getBrandInitials(brandName)}</span>
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-body-sm font-bold leading-none truncate">{brandName}</span>
              <span className="text-[10px] text-muted-foreground font-medium mt-1 truncate">{brandName} Suite</span>
            </div>
          </div>
          <ChevronDown className="text-muted-foreground text-[20px] shrink-0 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden flex flex-col p-1 z-30">
          <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Switch Brand</div>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted text-foreground transition-colors mb-1">
            <div className="size-6 bg-primary rounded flex items-center justify-center text-primary-foreground shrink-0 text-[10px] font-bold">
              {getBrandInitials(brandName)}
            </div>
            <span className="text-body-sm font-medium truncate">{brandName}</span>
            <Check className="text-[16px] text-primary ml-auto" />
          </button>
          {/* PLACEHOLDER: Add New Brand functionality - implement brand creation logic */}
          <button className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-label-sm font-medium" disabled>
            <Plus className="text-[16px]" />
            Add New Brand
          </button>
        </div>
      </details>
    </div>
  );

  const SidebarContent = ({ showBrandSelector = true }) => (
    <>
      <div className="flex flex-col gap-4 p-3 overflow-y-auto">
        {/* Brand Selector */}
        {showBrandSelector && <BrandSelector />}

        {/* Navigation Items */}
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/dashboard"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <Home className="text-[20px]" />
            <span className="text-body-sm font-medium">Dashboard</span>
          </Link>

          {/* Assets - Simple link, no dropdown */}
          <Link
            to="/assets"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/assets" || location.pathname.startsWith("/assets/")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <Grid className="text-[20px]" />
            <span className="text-body-sm font-medium">Assets</span>
          </Link>

          {/* PLACEHOLDER: CheckCircle icon - replace with actual brand verification icon */}
          <details className="group" open={expandedItems["My Brand"] || location.pathname.startsWith("/brand/") || location.pathname.startsWith("/brand/guidelines")}>
            <summary
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer select-none transition-colors list-none ${
                location.pathname === "/brand" || location.pathname.startsWith("/brand/") || location.pathname.startsWith("/brand/guidelines")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleExpanded("My Brand");
              }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="text-[20px]" />
                <span className="text-body-sm font-medium">My Brand</span>
              </div>
              <ChevronDown className={`text-[20px] transition-transform duration-200 ${expandedItems["My Brand"] || location.pathname.startsWith("/brand/") ? "rotate-180" : ""}`} />
            </summary>
            <div className="flex flex-col pl-9 pt-1 pb-1 gap-1">
              <Link
                to="/brand/guidelines"
                className={`block py-1.5 text-body-sm font-medium transition-colors ${
                  location.pathname === "/brand/guidelines" || location.pathname.startsWith("/brand/guidelines")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Brand Guidelines
              </Link>
              <Link
                to="/brand/colors"
                className={`block py-1.5 text-body-sm font-medium transition-colors ${
                  location.pathname === "/brand/colors"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Colors
              </Link>
              <Link
                to="/brand/typography"
                className={`block py-1.5 text-body-sm font-medium transition-colors ${
                  location.pathname === "/brand/typography"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Typography
              </Link>
              <Link
                to="/assets?category=logo"
                className={`block py-1.5 text-body-sm font-medium transition-colors ${
                  location.search.includes("category=logo")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Logos
              </Link>
            </div>
          </details>

          {/* PLACEHOLDER: Wand2 icon - replace with AI-specific icon */}
          <Link
            to="/sweep"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/sweep"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <Wand2 className="text-[20px]" />
            <span className="text-body-sm font-medium">AI Sweep</span>
          </Link>

          {/* PLACEHOLDER: Team functionality - implement team management logic */}
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
            disabled
          >
            <Users className="text-[20px]" />
            <span className="text-body-sm font-medium">Team</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Settings and User Profile */}
      <div className="flex flex-col">
        <div className="p-3 border-t border-border space-y-2">
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Settings className="text-[20px]" />
            <span className="text-body-sm font-medium">Settings</span>
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <User className="text-[20px]" />
            <span className="text-body-sm font-medium">User Profile</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground">
                  <span className="font-bold text-sm">{getBrandInitials(brandName)}</span>
                </div>
                <div>
                  <h2 className="font-semibold">{brandName}</h2>
                  <p className="text-xs text-muted-foreground">{brandName} Suite</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent showBrandSelector={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r border-border bg-card transition-transform duration-300 ease-in-out md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between pt-16">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
