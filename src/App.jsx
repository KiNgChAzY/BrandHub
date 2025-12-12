import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import UploadAsset from "./screens/BrandAssets/UploadAsset";
import AssetLibrary from "./screens/BrandAssets/AssetLibrary";
import ColorPalette from "./screens/BrandAssets/ColorPalette";
import TypographyShowcase from "./screens/BrandAssets/TypographyShowcase";
import BrandSweep from "./screens/BrandSweep";
import Templates from "./screens/Templates";
import ShareBrandPage from "./screens/ShareBrandPage";

function BrandLandingPage() {
  return (
    <div className="card">
      <h1 className="text-3xl font-bold mb-4">Brand Guidelines</h1>
      <p className="text-gray-400 mb-6">Select a section to view brand guidelines</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/brand/colors" className="card hover:bg-gray-50 transition-colors cursor-pointer">
          <h2 className="text-xl font-bold mb-2">Colors</h2>
          <p className="text-gray-600">View color palette and swatches</p>
        </Link>
        <Link to="/brand/typography" className="card hover:bg-gray-50 transition-colors cursor-pointer">
          <h2 className="text-xl font-bold mb-2">Typography</h2>
          <p className="text-gray-600">View font families and styles</p>
        </Link>
      </div>
    </div>
  );
}

function AdminRoute({ children }) {
  const { role, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto py-8">
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
    </BrowserRouter>
  );
}
