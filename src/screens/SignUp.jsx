import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password, role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Sign up failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" type="email" required />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white" type="password" required minLength={6} />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <div className="text-red-400">{error}</div>}
        <button className="px-4 py-2 bg-indigo-600 rounded">Create account</button>
      </form>
    </div>
  );
}
