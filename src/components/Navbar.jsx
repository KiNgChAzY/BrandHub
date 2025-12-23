import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              BrandHub
            </Link>
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/dashboard" 
                  className="text-sm text-foreground hover:text-primary transition-colors rounded-2xl px-3 py-2 hover:bg-accent"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/assets" 
                  className="text-sm text-foreground hover:text-primary transition-colors rounded-2xl px-3 py-2 hover:bg-accent"
                >
                  Assets
                </Link>
                <Link 
                  to="/brand" 
                  className="text-sm text-foreground hover:text-primary transition-colors rounded-2xl px-3 py-2 hover:bg-accent"
                >
                  Brand
                </Link>
                <Link 
                  to="/templates" 
                  className="text-sm text-foreground hover:text-primary transition-colors rounded-2xl px-3 py-2 hover:bg-accent"
                >
                  Templates
                </Link>
                <Link 
                  to="/sweep" 
                  className="text-sm text-foreground hover:text-primary transition-colors rounded-2xl px-3 py-2 hover:bg-accent"
                >
                  Sweep
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:block text-sm text-foreground px-3 py-1 bg-muted rounded-2xl">
                  {user.email}
                </span>
                {role === "admin" && (
                  <Link
                    to="/upload"
                    className="btn-success text-sm"
                  >
                    Upload
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  className="btn-danger text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-primary text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-secondary text-sm"
                >
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
