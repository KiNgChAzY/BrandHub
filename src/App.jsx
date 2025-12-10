import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import UploadAsset from "./screens/BrandAssets/UploadAsset";
import AssetLibrary from "./screens/BrandAssets/AssetLibrary";

function AdminRoute({ children }) {
  const { role, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return role === "admin" ? children : <Navigate to="/dashboard" />;
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="container mx-auto p-4">
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
            <Route path="/brand" element={<div>Brand pages (colors & typography)</div>} />
            <Route path="/templates" element={<div>Templates (coming soon)</div>} />
            <Route path="/share/:id" element={<div>Shared view</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
