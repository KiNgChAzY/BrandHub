import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is configured
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) setRole(snap.data().role || "user");
          else setRole("user");
        } catch (err) {
          console.error("Error fetching user role:", err);
          setRole("user");
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Auth state error:", error);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signup(
    email,
    password,
    selectedRole = "user",
    displayName = "",
    brandName = "",
    brandDescription = ""
  ) {
    if (!auth) {
      throw new Error("Firebase not configured. Please set up .env.local with Firebase credentials.");
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // create user profile in Firestore
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      role: selectedRole,
      displayName,
      brandName: brandName || "",
      brandDescription: brandDescription || "",
      lastLogin: serverTimestamp(),
    });
    return res;
  }

  function login(email, password) {
    if (!auth) {
      throw new Error("Firebase not configured. Please set up .env.local with Firebase credentials.");
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (!auth) return Promise.resolve();
    return signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, role, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
