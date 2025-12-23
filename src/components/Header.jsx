import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, PanelLeft, Cloud, MessageSquare, Bell, LogOut, Upload } from "lucide-react";

function Header({ sidebarOpen, setSidebarOpen, setMobileMenuOpen, pageTitle }) {
  const { user, role, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="p-2 hover:bg-muted rounded-2xl md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-muted rounded-2xl hidden md:flex"
      >
        <PanelLeft className="h-5 w-5" />
      </button>
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">{pageTitle || "BrandHub"}</h1>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {role === "admin" && (
                <Link
                  to="/upload"
                  className="p-2 hover:bg-muted rounded-2xl"
                  title="Upload Asset"
                >
                  <Upload className="h-5 w-5" />
                </Link>
              )}
              <button
                onClick={() => logout()}
                className="p-2 hover:bg-muted rounded-2xl"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary border-2 border-primary">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
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
    </header>
  );
}

export default Header;

