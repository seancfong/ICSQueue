import React, { useEffect, useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";
import { db } from "@/lib/utils/firebase";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import Link from "next/link";

type Props = {
  children: JSX.Element;
};

const Admin = ({ children }: Props) => {
  const router = useRouter();
  const { user, isAdmin } = UserAuth();

  if (!user) {
    // Not signed in
    router.push("/");
  }

  return isAdmin ? (
    children
  ) : (
    <main className="font-primary dot-texture h-[calc(100vh-60px)] w-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="text-lg">You are not authorized to view this page.</h3>
        <Link href="/" className="text-lightblue underline">
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default Admin;
