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
import { ImageIcon, Palette, Type, Wand2, FileText, Users } from "lucide-react";
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
      name: "Asset Page",
      icon: <ImageIcon className="text-primary-accent h-6 w-6" />,
      description: "Browse and download brand assets",
      path: "/assets",
    },
    {
      name: "Color Palette",
      icon: <Palette className="text-warning h-6 w-6" />,
      description: "View brand color guidelines",
      path: "/brand/colors",
    },
    {
      name: "Typography",
      icon: <Type className="text-error h-6 w-6" />,
      description: "Font families and styles",
      path: "/brand/typography",
    },
    {
      name: "Brand Sweep",
      icon: <Wand2 className="text-info h-6 w-6" />,
      description: "Scan for outdated brand usage",
      path: "/sweep",
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
        <div className="overflow-hidden rounded-xl bg-primary p-8 text-primary-foreground">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="px-3 py-1 rounded-lg bg-primary-foreground/20 text-primary-foreground text-label-md font-medium inline-block">
                Welcome Back
              </div>
              <h2 className="text-heading-xl">
                {brandName ? `${brandName} Dashboard` : "BrandHub Dashboard"}
              </h2>
              <p className="max-w-[600px] text-body-md text-primary-foreground/80">
                {brandDescription || "Manage your brand assets, track usage, and maintain consistency across all channels."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/assets" className="btn-secondary bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Browse Assets
                </Link>
                <Link to="/sweep" className="btn-secondary border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-white hover:text-primary">
                  Run Sweep
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-primary-foreground/10 backdrop-blur-md" />
                <div className="absolute inset-4 rounded-full bg-primary-foreground/20" />
                <div className="absolute inset-8 rounded-full bg-primary-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Apps */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-lg">Quick Access</h2>
          <Link to="/assets" className="text-body-sm text-muted-foreground hover:text-primary transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {quickApps.map((app) => (
            <Link
              key={app.name}
              to={app.path}
              className="card hover:shadow-float transition-all duration-300"
            >
              <div className="pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    {app.icon}
                  </div>
                </div>
                <h3 className="text-heading-sm mb-1">{app.name}</h3>
                <p className="text-body-sm text-muted-foreground">{app.description}</p>
              </div>
              <div className="pt-2">
                <div className="w-full px-4 py-2 rounded-lg bg-primary/10 text-primary text-label-md font-medium text-center">
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
            <h2 className="text-heading-lg">Recent Files</h2>
            <Link to="/assets" className="text-body-sm text-muted-foreground hover:text-primary transition-colors">
              View All
            </Link>
          </div>
          <div className="card">
            {loading ? (
              <div className="text-center py-12 text-body-md text-muted-foreground">Loading...</div>
            ) : recent.length === 0 ? (
              <div className="p-4 text-center text-body-sm text-muted-foreground">
                No recent files. Upload your first asset to get started!
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recent.slice(0, 4).map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-body-md font-medium">{r.name || "Untitled"}</p>
                        <p className="text-body-sm text-muted-foreground">
                          {r.category || "uncategorized"} • {r.fileType || "file"}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/assets"
                      className="px-3 py-1 rounded-lg text-body-sm hover:bg-muted transition-colors"
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
            <h2 className="text-heading-lg">Active Projects</h2>
            <button className="text-body-sm text-muted-foreground hover:text-primary transition-colors">
              View All
            </button>
          </div>
          <div className="card">
            <div className="divide-y divide-border">
              {projects.map((project, index) => (
                <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-body-md font-medium">{project.name}</h3>
                    <span className="px-2 py-1 text-label-sm rounded-lg bg-muted text-muted-foreground">
                      Due {project.dueDate}
                    </span>
                  </div>
                  <p className="text-body-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-body-sm">
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
                  <div className="flex items-center justify-between text-body-sm text-muted-foreground">
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
          <div className="card">
            <div className="text-label-md font-medium text-muted-foreground mb-2">Total Assets</div>
            <div className="text-heading-xl font-bold text-primary">{totalAssets}</div>
            <div className="text-caption mt-2">Across all categories</div>
          </div>
          <div className="card">
            <div className="text-label-md font-medium text-muted-foreground mb-2">Recent Activity</div>
            <div className="text-heading-xl font-bold text-primary-accent">{recent.length}</div>
            <div className="text-caption mt-2">Last 5 uploads</div>
          </div>
          <div className="card">
            <div className="text-label-md font-medium text-muted-foreground mb-2">Brand Health</div>
            <div className="text-heading-xl font-bold text-success">92%</div>
            <div className="text-caption mt-2">Consistency score</div>
          </div>
        </div>
      </section>
    </div>
  );
}


