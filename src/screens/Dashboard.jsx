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
import { ImageIcon, Palette, Type, Wand2, FileText, CheckCircle, Download } from "lucide-react";
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
                <div className="flex items-center justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    {app.icon}
                  </div>
                </div>
                <h3 className="text-heading-sm mb-1 text-center">{app.name}</h3>
                <p className="text-body-sm text-muted-foreground text-center">{app.description}</p>
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

      {/* Brand Status and Recent Activity */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Brand Status and Asset Authority Snapshot */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Brand Status Card */}
          <div className="card relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-success"></div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col gap-2 z-10">
                <h3 className="text-heading-md flex items-center gap-3">
                  Brand Status
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success-light text-success-foreground text-label-sm font-bold uppercase tracking-wider border border-success/20">
                    <span className="size-1.5 rounded-full bg-success"></span> Stable
                  </span>
                </h3>
                <p className="text-body-sm text-muted-foreground leading-relaxed">
                  {brandName ? `${brandName} brand assets are currently in active use across all channels.` : "Brand assets are currently in active use across all channels."}
                </p>
              </div>
              <div className="hidden sm:flex size-12 bg-success-light rounded-full items-center justify-center text-success shrink-0">
                <CheckCircle className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Asset Authority Snapshot */}
          <div>
            <h3 className="text-heading-md mb-4">Asset Authority Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <ImageIcon className="text-muted-foreground" />
                  <h4 className="text-body-md font-semibold">Logos</h4>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-body-sm font-medium">{totalAssets > 0 ? `${totalAssets} approved versions` : "No assets yet"}</span>
                  <span className="text-label-sm text-muted-foreground">Primary set active</span>
                </div>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="text-muted-foreground" />
                  <h4 className="text-body-md font-semibold">Colors</h4>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-body-sm font-medium">1 active palette</span>
                  <span className="text-label-sm text-muted-foreground">Main brand colors</span>
                </div>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <Type className="text-muted-foreground" />
                  <h4 className="text-body-md font-semibold">Typography</h4>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-body-sm font-medium">2 approved fonts</span>
                  <span className="text-label-sm text-muted-foreground">Inter & Serif</span>
                </div>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="text-muted-foreground" />
                  <h4 className="text-body-md font-semibold">Guidelines</h4>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-body-sm font-medium text-success">Up to date</span>
                  <span className="text-label-sm text-muted-foreground">Last updated recently</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="flex flex-col gap-8">
          <div className="card flex flex-col h-full max-h-[400px]">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h3 className="text-heading-md">Recent Activity</h3>
              <Link to="/assets" className="text-label-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                View All
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {loading ? (
                <div className="text-center py-12 text-body-sm text-muted-foreground">Loading...</div>
              ) : recent.length === 0 ? (
                <div className="text-center py-12 text-body-sm text-muted-foreground">
                  No recent activity. Upload your first asset to get started!
                </div>
              ) : (
                <div className="flex flex-col">
                  {recent.slice(0, 4).map((r, index) => (
                    <div key={r.id} className="flex gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors group">
                      <div className="mt-1 size-8 rounded-full bg-info-light text-info flex items-center justify-center shrink-0 border border-info/20">
                        <Download className="text-[18px]" />
                      </div>
                      <div>
                        <p className="text-body-sm">
                          <span className="font-semibold">{r.name || "Untitled"}</span> {r.category || "asset"} uploaded
                        </p>
                        <p className="text-label-sm text-muted-foreground mt-1">
                          {index === 0 ? "Just now" : index === 1 ? "1 hour ago" : index === 2 ? "Yesterday" : "2 days ago"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


