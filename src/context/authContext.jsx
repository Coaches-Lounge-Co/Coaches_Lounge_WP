import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (!user) {
        setCurrentProfile(null);
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setCurrentProfile({ id: user.uid, ...profileSnap.data() });
        } else {
          setCurrentProfile(null);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setCurrentProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function signUp({ email, password, profile }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    const profileData = {
      ...profile,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "profiles", uid), profileData);

    setCurrentProfile({ id: uid, ...profileData });
    return uid;
  }

  async function signIn({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    const profileSnap = await getDoc(doc(db, "profiles", uid));
    if (profileSnap.exists()) {
      setCurrentProfile({ id: uid, ...profileSnap.data() });
    }

    return uid;
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setCurrentProfile(null);
  }

  async function updateMyProfile(patch) {
    if (!firebaseUser) throw new Error("Not signed in.");

    const profileRef = doc(db, "profiles", firebaseUser.uid);

    const safePatch = {
      ...patch,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(profileRef, safePatch);

    const updatedSnap = await getDoc(profileRef);
    if (updatedSnap.exists()) {
      setCurrentProfile({ id: firebaseUser.uid, ...updatedSnap.data() });
    }
  }

  const value = useMemo(
    () => ({
      currentUserId: firebaseUser?.uid ?? null,
      currentProfile,
      loading,
      signUp,
      signIn,
      signOut,
      updateMyProfile,
      firebaseUser,
    }),
    [firebaseUser, currentProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}