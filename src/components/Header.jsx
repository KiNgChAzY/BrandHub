import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, Grid, Search, Bell, LogOut, Upload } from "lucide-react";

function Header({ setMobileMenuOpen }) {
  const { user, role, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 flex shrink-0 items-center justify-between whitespace-nowrap border-b border-border bg-card py-3 pl-3 pr-6 md:pl-4 z-40">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile menu toggle - left of logo */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 hover:bg-muted rounded-lg md:hidden transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Logo and BrandHub text */}
        <div className="flex items-center gap-3 text-foreground">
          {/* PLACEHOLDER: Grid icon - replace with actual BrandHub logo */}
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-primary-foreground">
            <Grid className="text-xl" />
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">BrandHub</h2>
        </div>

        {/* Search bar - hidden on mobile, visible on md+ */}
        <label className="hidden md:flex flex-col min-w-64 h-10 w-96">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-muted overflow-hidden focus-within:ring-2 focus-within:ring-ring/50 transition-all">
            <div className="text-muted-foreground flex items-center justify-center pl-4 pr-2">
              <Search className="text-xl" />
            </div>
            {/* PLACEHOLDER: Search functionality - implement search logic for assets and campaigns */}
            <input
              className="flex w-full min-w-0 flex-1 resize-none bg-transparent border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-0 focus:ring-0 h-full"
              placeholder="Search assets, campaigns..."
              disabled
            />
          </div>
        </label>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* PLACEHOLDER: Notifications functionality - implement notifications system */}
              <button
                className="flex items-center justify-center size-8 rounded-full text-muted-foreground hover:bg-muted transition-colors"
                aria-label="Notifications"
                disabled
                title="Notifications (Coming soon)"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Upload button (admin only) */}
              {role === "admin" && (
                <Link
                  to="/upload"
                  className="flex items-center justify-center size-8 rounded-full text-muted-foreground hover:bg-muted transition-colors"
                  title="Upload Asset"
                >
                  <Upload className="h-5 w-5" />
                </Link>
              )}

              {/* Logout button */}
              <button
                onClick={() => logout()}
                className="flex items-center justify-center size-8 rounded-full text-muted-foreground hover:bg-muted transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>

              {/* User avatar */}
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary border-2 border-primary">
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

