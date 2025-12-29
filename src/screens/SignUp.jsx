import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { isValidRole } from "../utils/security";
import { getFirebaseErrorMessage } from "../utils/errorMessages";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    // Validate role (prevent manipulation)
    if (!isValidRole(role)) {
      setError("Invalid role selected.");
      return;
    }
    
    try {
      await signup(email, password, role, "", brandName, brandDescription);
      navigate("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-heading-xl mb-2 text-center">Create Account</h2>
        <p className="text-muted-foreground text-center mb-6">Join BrandHub to manage your brand assets</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={254}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              maxLength={128}
            />
            <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Admins can upload and manage assets</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Brand Name (optional)</label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="input"
              placeholder="e.g., Acme Corporation"
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Brand Description (optional)</label>
            <textarea
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              className="input"
              placeholder="Brief description of your brand"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum 500 characters</p>
          </div>
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          <button type="submit" className="btn-primary w-full">
            Create account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


