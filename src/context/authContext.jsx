// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const LS_USER = "cl_current_user";       // { id }
const LS_PROFILES = "cl_profiles";       // { [id]: profileObject }

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(() => readJSON(LS_USER, null)?.id ?? null);
  const [profiles, setProfiles] = useState(() => readJSON(LS_PROFILES, {}));

  // persist profiles
  useEffect(() => {
    writeJSON(LS_PROFILES, profiles);
  }, [profiles]);

  // persist current user
  useEffect(() => {
    if (currentUserId) writeJSON(LS_USER, { id: currentUserId });
    else localStorage.removeItem(LS_USER);
  }, [currentUserId]);

  const currentProfile = currentUserId ? profiles[currentUserId] : null;

  function signUp({ email, password, profile }) {
    // mock auth: email must be unique
    const existing = Object.values(profiles).find((p) => p.email?.toLowerCase() === email.toLowerCase());
    if (existing) throw new Error("Email already in use.");

    const id = crypto.randomUUID();

    const newProfile = {
      id,
      email,
      // DO NOT store real passwords in real apps. This is mock-only.
      _pw: password,
      createdAt: new Date().toISOString(),
      ...profile,
    };

    setProfiles((prev) => ({ ...prev, [id]: newProfile }));
    setCurrentUserId(id);
    return id;
  }

  function signIn({ email, password }) {
    const match = Object.values(profiles).find(
      (p) => p.email?.toLowerCase() === email.toLowerCase() && p._pw === password
    );
    if (!match) throw new Error("Invalid email or password.");
    setCurrentUserId(match.id);
    return match.id;
  }

  function signOut() {
    setCurrentUserId(null);
  }

  function updateMyProfile(patch) {
    if (!currentUserId) throw new Error("Not signed in.");
    setProfiles((prev) => ({
      ...prev,
      [currentUserId]: { ...prev[currentUserId], ...patch, updatedAt: new Date().toISOString() },
    }));
  }

  const value = useMemo(
    () => ({
      currentUserId,
      currentProfile,
      signUp,
      signIn,
      signOut,
      updateMyProfile,
      profiles, // optional (debug/admin)
    }),
    [currentUserId, currentProfile, profiles]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}