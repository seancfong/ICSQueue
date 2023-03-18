import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/utils/firebase";
import React from "react";
import { collection, doc, DocumentSnapshot, getDoc } from "firebase/firestore";

interface AuthContextInterface {
  DEBUG: boolean;
  googleSignIn: () => void;
  logOut: () => void;
  user: User;
  isAdmin: boolean | null;
}

// @ts-ignore
const AuthContext = createContext<AuthContextInterface>();

type Props = {
  children: any;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG == "true" || false;

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const queryAdmin = async () => {
      if (user?.email) {
        const adminDoc = doc(db, "admin", user?.email);
        const adminDocSnap: DocumentSnapshot = await getDoc(adminDoc);

        if (adminDocSnap.exists()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    queryAdmin();
  }, [user?.email]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("user", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, isAdmin, DEBUG }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
