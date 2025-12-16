import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            BrandHub
          </Link>
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/dashboard" 
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
            Dashboard
          </Link>
                <Link 
                  to="/assets" 
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Assets
                </Link>
                <Link 
                  to="/brand" 
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
            Brand
          </Link>
                <Link 
                  to="/templates" 
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
            Templates
          </Link>
                <Link 
                  to="/sweep" 
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sweep
                </Link>
              </div>
            )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
                <span className="hidden sm:block text-sm text-gray-700 px-3 py-1 bg-gray-100 rounded-lg">
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
