import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-semibold">BrandHub</Link>
          <Link to="/dashboard" className="text-sm hover:underline">Dashboard</Link>
          <Link to="/brand" className="text-sm hover:underline">Brand</Link>
          <Link to="/templates" className="text-sm hover:underline">Templates</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              {role === 'admin' && <Link to="/upload" className="text-sm px-2 py-1 bg-green-600 rounded">Upload</Link>}
              <button onClick={() => logout()} className="text-sm px-2 py-1 bg-red-600 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm px-2 py-1 bg-indigo-600 rounded">Login</Link>
              <Link to="/signup" className="text-sm px-2 py-1 bg-gray-700 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
