"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isDemoMode: boolean;
  error: string | null;
  clearError: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = "gdgoc_demo_user";

function formatAuthError(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = String((err as { code: string }).code);
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Email atau password tidak sesuai. Silakan periksa kembali.";
      case "auth/email-already-in-use":
        return "Email ini sudah terdaftar. Silakan gunakan email lain atau Sign In.";
      case "auth/weak-password":
        return "Password terlalu lemah. Gunakan minimal 6 karakter.";
      case "auth/invalid-email":
        return "Format alamat email tidak valid.";
      case "auth/popup-closed-by-user":
        return "Jendela login Google ditutup sebelum proses selesai.";
      case "auth/cancelled-popup-request":
        return "Permintaan login Google dibatalkan.";
      case "auth/network-request-failed":
        return "Koneksi jaringan terputus. Silakan coba lagi.";
      default:
        if ("message" in err) return String(err.message);
    }
  }
  if (err instanceof Error) return err.message;
  return "Terjadi kesalahan saat memproses autentikasi.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // Listen to Auth State
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "Member",
            photoURL: fbUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Demo / Fallback Mode using localStorage
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem(DEMO_STORAGE_KEY) : null;
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    setError(null);
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "Member",
          photoURL: fbUser.photoURL,
        });
      } catch (err) {
        const msg = formatAuthError(err);
        setError(msg);
        throw new Error(msg);
      }
    } else {
      // Demo Mode login simulation
      const fallbackUser: AppUser = {
        uid: "demo-" + Date.now(),
        email: email,
        displayName: email.split("@")[0].replace(/[._-]/g, " ") || "Demo Member",
        photoURL: null,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(fallbackUser));
      }
      setUser(fallbackUser);
    }
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, fullName: string) => {
      setError(null);
      if (!email || !password || !fullName) {
        setError("Semua field wajib diisi.");
        return;
      }

      if (isFirebaseConfigured && auth) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const fbUser = userCredential.user;
          if (fullName.trim()) {
            await updateProfile(fbUser, { displayName: fullName.trim() });
          }
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fullName.trim() || fbUser.email?.split("@")[0] || "Member",
            photoURL: fbUser.photoURL,
          });
        } catch (err) {
          const msg = formatAuthError(err);
          setError(msg);
          throw new Error(msg);
        }
      } else {
        // Demo Mode signup simulation
        const fallbackUser: AppUser = {
          uid: "demo-" + Date.now(),
          email: email,
          displayName: fullName.trim() || "Demo Member",
          photoURL: null,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(fallbackUser));
        }
        setUser(fallbackUser);
      }
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const fbUser = userCredential.user;
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "Member",
          photoURL: fbUser.photoURL,
        });
      } catch (err) {
        const msg = formatAuthError(err);
        setError(msg);
        throw new Error(msg);
      }
    } else {
      // Demo Mode Google Login simulation
      const fallbackUser: AppUser = {
        uid: "demo-google-" + Date.now(),
        email: "demo.student@gmail.com",
        displayName: "Demo Student",
        photoURL: null,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(fallbackUser));
      }
      setUser(fallbackUser);
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
        setUser(null);
      } catch (err) {
        console.error("Sign out error:", err);
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem(DEMO_STORAGE_KEY);
      }
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemoMode: !isFirebaseConfigured,
        error,
        clearError,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
