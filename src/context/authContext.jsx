import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setCurrentProfile(null);
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setCurrentProfile({
            id: profileSnap.id,
            ...profileSnap.data(),
          });
        } else {
          const starterProfile = {
            id: user.uid,
            email: user.email || "",
            name: user.displayName || "",
            role: "Player",
            avatarUrl: user.photoURL || null,
            age: "",
            location: "",
            height: "",
            resume: "",
            yearsExperience: "",
            awards: [],
            socialLinks: [],
            ageConfirmed: false,
            followersCount: 0,
            likesCount: 0,
            videoHighlights: [],
            school: "",
            positions: "",
            program: "",
            strengths: [],
            goals: [],
            stats: { activeEvents: 0, totalGames: 0, connections: 0 },
            highlights: [],
            recentActivity: [],
            coachesNotes: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          await setDoc(profileRef, starterProfile);
          setCurrentProfile(starterProfile);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setCurrentProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp({ email, password, profile }) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      const starterProfile = {
        id: user.uid,
        email: user.email || email || "",
        name: profile?.name || "",
        role: profile?.role || "Player",
        avatarUrl: profile?.avatarUrl || null,
        age: profile?.age || "",
        location: profile?.location || "",
        height: profile?.height || "",
        resume: profile?.resume || "",
        yearsExperience: profile?.yearsExperience || "",
        awards: profile?.awards || [],
        socialLinks: profile?.socialLinks || [],
        ageConfirmed: profile?.ageConfirmed || false,
        followersCount: 0,
        likesCount: 0,
        videoHighlights: profile?.videoHighlights || [],
        school: profile?.school || "",
        positions: profile?.positions || "",
        program: profile?.program || "",
        strengths: profile?.strengths || [],
        goals: profile?.goals || [],
        stats: profile?.stats || { activeEvents: 0, totalGames: 0, connections: 0 },
        highlights: profile?.highlights || [],
        recentActivity: profile?.recentActivity || [],
        coachesNotes: profile?.coachesNotes || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "profiles", user.uid), starterProfile);
      setCurrentProfile(starterProfile);

      return cred;
    } catch (error) {
      console.error("Failed to sign up:", error);

      if (error.code === "auth/email-already-in-use") {
        throw new Error("That email is already in use.");
      }

      if (error.code === "auth/invalid-email") {
        throw new Error("Please enter a valid email address.");
      }

      if (error.code === "auth/weak-password") {
        throw new Error("Password should be at least 6 characters.");
      }

      throw new Error("Failed to create account.");
    }
  }

  async function updateMyProfile(profileUpdates) {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const profileRef = doc(db, "profiles", user.uid);

    const payload = {
      ...profileUpdates,
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(profileRef, payload, { merge: true });

      setCurrentProfile((prev) => ({
        ...(prev || {}),
        id: user.uid,
        ...profileUpdates,
      }));
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw new Error("Failed to save profile.");
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setCurrentProfile(null);
  }

  async function deleteMyAccount(password) {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    if (!user.email) {
      throw new Error("This account does not have an email associated with it.");
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "profiles", user.uid));
      await deleteUser(user);

      setCurrentProfile(null);
      setCurrentUser(null);
    } catch (error) {
      console.error("Failed to delete account:", error);

      if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password.");
      }

      if (error.code === "auth/invalid-credential") {
        throw new Error("Invalid credentials. Please try again.");
      }

      if (error.code === "auth/too-many-requests") {
        throw new Error("Too many attempts. Please wait and try again.");
      }

      if (error.code === "auth/requires-recent-login") {
        throw new Error("Please sign in again and retry deleting your account.");
      }

      throw new Error("Failed to delete account.");
    }
  }

  const value = useMemo(
    () => ({
      currentUser,
      currentProfile,
      updateMyProfile,
      signIn,
      signOut,
      signUp,
      deleteMyAccount,
    }),
    [currentUser, currentProfile]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return ctx;
}