import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import UploadAsset from "./screens/BrandAssets/UploadAsset";
import AssetLibrary from "./screens/BrandAssets/AssetLibrary";
import AssetDetail from "./screens/BrandAssets/AssetDetail";
import ColorPalette from "./screens/BrandAssets/ColorPalette";
import TypographyShowcase from "./screens/BrandAssets/TypographyShowcase";
import BrandSweep from "./screens/BrandSweep";
import Templates from "./screens/Templates";
import ShareBrandPage from "./screens/ShareBrandPage";

function BrandLandingPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Brand Guidelines</h2>
              <p className="max-w-[600px] text-white/80">
                Access your complete brand identity system including colors, typography, and assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Sections */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/brand/colors"
            className="card overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="aspect-video bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <h3 className="text-lg font-semibold">Colors</h3>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Color Palette</h3>
              <p className="text-muted-foreground">View color palette and swatches</p>
            </div>
          </Link>
          <Link
            to="/brand/typography"
            className="card overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">✍️</div>
                <h3 className="text-lg font-semibold">Typography</h3>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Typography</h3>
              <p className="text-muted-foreground">View font families and styles</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

function AdminRoute({ children }) {
  const { role, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  return role === "admin" ? children : <Navigate to="/dashboard" />;
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Page titles mapping
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/assets": "Asset Library",
    "/brand": "Brand Guidelines",
    "/brand/colors": "Color Palette",
    "/brand/typography": "Typography",
    "/templates": "Templates",
    "/sweep": "Brand Sweep",
    "/upload": "Upload Asset",
  };

  // Handle dynamic routes like /assets/:assetId
  const getPageTitle = () => {
    if (location.pathname.startsWith("/assets/") && location.pathname !== "/assets") {
      return "Asset Details";
    }
    return pageTitles[location.pathname] || "BrandHub";
  };

  const pageTitle = getPageTitle();

  // Don't show sidebar on auth pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        }`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          pageTitle={pageTitle}
        />
        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <AdminRoute>
                  <UploadAsset />
                </AdminRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <PrivateRoute>
                  <AssetLibrary />
                </PrivateRoute>
              }
            />
            <Route
              path="/assets/:assetId"
              element={
                <PrivateRoute>
                  <AssetDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/brand"
              element={
                <PrivateRoute>
                  <BrandLandingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/brand/colors"
              element={
                <PrivateRoute>
                  <ColorPalette />
                </PrivateRoute>
              }
            />
            <Route
              path="/brand/typography"
              element={
                <PrivateRoute>
                  <TypographyShowcase />
                </PrivateRoute>
              }
            />
            <Route
              path="/sweep"
              element={
                <PrivateRoute>
                  <BrandSweep />
                </PrivateRoute>
              }
            />
            <Route
              path="/templates"
              element={
                <PrivateRoute>
                  <Templates />
                </PrivateRoute>
              }
            />
            <Route
              path="/share/:id"
              element={<ShareBrandPage />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
