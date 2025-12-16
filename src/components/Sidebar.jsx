import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  Grid,
  FileText,
  Layers,
  Palette,
  Wand2,
  Settings,
  ChevronDown,
  Search,
  X,
  Menu,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }) {
  const location = useLocation();
  const { user, role } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});

  const sidebarItems = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
      isActive: location.pathname === "/dashboard",
    },
    {
      title: "Assets",
      icon: <Grid className="h-5 w-5" />,
      path: "/assets",
      isActive: location.pathname === "/assets",
    },
    {
      title: "Brand",
      icon: <Palette className="h-5 w-5" />,
      items: [
        { title: "Colors", path: "/brand/colors" },
        { title: "Typography", path: "/brand/typography" },
      ],
    },
    {
      title: "Templates",
      icon: <Layers className="h-5 w-5" />,
      path: "/templates",
      isActive: location.pathname === "/templates",
    },
    {
      title: "Sweep",
      icon: <Wand2 className="h-5 w-5" />,
      path: "/sweep",
      isActive: location.pathname === "/sweep",
    },
  ];

  const toggleExpanded = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const SidebarContent = () => (
    <>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <Wand2 className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold">BrandHub</h2>
            <p className="text-xs text-muted-foreground">Brand Suite</p>
          </div>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            maxLength={100}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium ${
                    item.isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium ${
                      item.isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.items && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedItems[item.title] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.path}
                          className={`flex items-center rounded-2xl px-3 py-2 text-sm hover:bg-muted ${
                            location.pathname === subItem.path
                              ? "text-primary font-medium"
                              : "text-foreground"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted text-foreground">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          {user && (
            <div className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-foreground">{user.email || "User"}</span>
              </div>
              {role === "admin" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  Admin
                </span>
              )}
            </div>
          )}
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
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">BrandHub</h2>
                <p className="text-xs text-muted-foreground">Brand Suite</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-muted rounded-2xl"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

export default Sidebar;

