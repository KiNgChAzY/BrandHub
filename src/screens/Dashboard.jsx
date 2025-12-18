import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { ImageIcon, Palette, Type, Layers, Wand2, FileText, TrendingUp, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [totalAssets, setTotalAssets] = useState(0);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    
    // Load brand info from user profile
    if (user) {
      const loadBrandInfo = async () => {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setBrandName(userData.brandName || "");
            setBrandDescription(userData.brandDescription || "");
          }
        } catch (err) {
          console.error("Error loading brand info:", err);
        }
      };
      loadBrandInfo();
    }
    
    const assetsRef = collection(db, "assets");
    const qRecent = query(assetsRef, orderBy("uploadedAt", "desc"), limit(5));

    const unsubTotal = onSnapshot(assetsRef, (snap) => {
      setTotalAssets(snap.size);
    }, (error) => {
      console.error("Error loading assets:", error);
      setLoading(false);
    });

    const unsubRecent = onSnapshot(qRecent, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecent(items);
      setLoading(false);
    }, (error) => {
      console.error("Error loading recent assets:", error);
      setLoading(false);
    });

    return () => {
      unsubTotal();
      unsubRecent();
    };
  }, [user]);

  // Quick access apps (using our actual routes)
  const quickApps = [
    {
      name: "Asset Library",
      icon: <ImageIcon className="text-violet-500 h-6 w-6" />,
      description: "Browse and download brand assets",
      path: "/assets",
      color: "violet",
    },
    {
      name: "Color Palette",
      icon: <Palette className="text-orange-500 h-6 w-6" />,
      description: "View brand color guidelines",
      path: "/brand/colors",
      color: "orange",
    },
    {
      name: "Typography",
      icon: <Type className="text-pink-500 h-6 w-6" />,
      description: "Font families and styles",
      path: "/brand/typography",
      color: "pink",
    },
    {
      name: "Brand Sweep",
      icon: <Wand2 className="text-blue-500 h-6 w-6" />,
      description: "Scan for outdated brand usage",
      path: "/sweep",
      color: "blue",
    },
  ];

  // Placeholder projects (will be replaced with real data later)
  const projects = [
    {
      name: "Q1 Brand Campaign",
      description: "Complete brand refresh for Q1 marketing materials",
      progress: 75,
      dueDate: "March 15, 2025",
      members: 4,
      files: 23,
    },
    {
      name: "Website Redesign",
      description: "Update website with new brand guidelines",
      progress: 60,
      dueDate: "April 30, 2025",
      members: 6,
      files: 42,
    },
    {
      name: "Social Media Assets",
      description: "Create consistent social media templates",
      progress: 90,
      dueDate: "February 25, 2025",
      members: 3,
      files: 18,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="px-3 py-1 rounded-xl bg-white/20 text-white text-sm font-medium inline-block">
                Welcome Back
              </div>
              <h2 className="text-3xl font-bold">
                {brandName ? `${brandName} Dashboard` : "BrandHub Dashboard"}
              </h2>
              <p className="max-w-[600px] text-white/80">
                {brandDescription || "Manage your brand assets, track usage, and maintain consistency across all channels."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/assets" className="px-4 py-2 rounded-2xl bg-white text-indigo-700 hover:bg-white/90 font-medium">
                  Browse Assets
                </Link>
                <Link to="/sweep" className="px-4 py-2 rounded-2xl bg-transparent border border-white text-white hover:bg-white/10 font-medium">
                  Run Sweep
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                <div className="absolute inset-4 rounded-full bg-white/20" />
                <div className="absolute inset-8 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Apps */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Quick Access</h2>
          <Link to="/assets" className="text-sm text-muted-foreground hover:text-primary">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {quickApps.map((app) => (
            <Link
              key={app.name}
              to={app.path}
              className="card overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                    {app.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{app.name}</h3>
                <p className="text-sm text-muted-foreground">{app.description}</p>
              </div>
              <div className="pt-2">
                <div className="w-full px-4 py-2 rounded-2xl bg-primary/10 text-primary text-sm font-medium text-center">
                  Open
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats and Recent Files */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Recent Files */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Files</h2>
            <Link to="/assets" className="text-sm text-muted-foreground hover:text-primary">
              View All
            </Link>
          </div>
          <div className="rounded-3xl border">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : recent.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No recent files. Upload your first asset to get started!
              </div>
            ) : (
              <div className="divide-y">
                {recent.slice(0, 4).map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{r.name || "Untitled"}</p>
                        <p className="text-sm text-muted-foreground">
                          {r.category || "uncategorized"} • {r.fileType || "file"}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/assets"
                      className="px-3 py-1 rounded-xl text-sm hover:bg-muted"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Active Projects */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Active Projects</h2>
            <button className="text-sm text-muted-foreground hover:text-primary">
              View All
            </button>
          </div>
          <div className="rounded-3xl border">
            <div className="divide-y">
              {projects.map((project, index) => (
                <div key={index} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="px-2 py-1 text-xs rounded-xl bg-muted text-muted-foreground">
                      Due {project.dueDate}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.members} members
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {project.files} files
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Stats Cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card">
            <div className="text-sm font-medium text-muted-foreground mb-2">Total Assets</div>
            <div className="text-4xl font-bold text-primary">{totalAssets}</div>
            <div className="text-xs text-muted-foreground mt-2">Across all categories</div>
          </div>
          <div className="metric-card">
            <div className="text-sm font-medium text-muted-foreground mb-2">Recent Activity</div>
            <div className="text-4xl font-bold text-chart-2">{recent.length}</div>
            <div className="text-xs text-muted-foreground mt-2">Last 5 uploads</div>
          </div>
          <div className="metric-card">
            <div className="text-sm font-medium text-muted-foreground mb-2">Brand Health</div>
            <div className="text-4xl font-bold text-chart-3">92%</div>
            <div className="text-xs text-muted-foreground mt-2">Consistency score</div>
          </div>
        </div>
      </section>
    </div>
  );
}


