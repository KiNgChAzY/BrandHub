import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <nav
      className="bg-white/90 backdrop-blur-sm border-b shadow-sm"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-2xl font-bold transition-colors hover:opacity-80"
              style={{ color: "var(--brand-primary)" }}
            >
              BrandHub
            </Link>
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/assets"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Assets
                </Link>
                <Link
                  to="/brand"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Brand
                </Link>
                <Link
                  to="/templates"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Templates
                </Link>
                <Link
                  to="/sweep"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Sweep
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span
                  className="hidden sm:block text-sm px-3 py-1 rounded-lg font-medium"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  {user.email}
                </span>
                {role === "admin" && (
                  <Link to="/upload" className="btn-success text-sm">
                    Upload
                  </Link>
                )}
                <button onClick={() => logout()} className="btn-danger text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary text-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn-secondary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
