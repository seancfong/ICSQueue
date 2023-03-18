import Protected from "@/components/Protected";
import { UserAuth } from "@/lib/context/AuthContext";
import { db } from "@/lib/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  query,
  setDoc,
} from "firebase/firestore";
import Head from "next/head";
import React, { useState } from "react";

type Props = {};

const Register = (props: Props) => {
  const { user } = UserAuth();

  const [formInput, setFormInput] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    // Prevent form from refreshing the browser
    event.preventDefault();

    // Get the authcode doc
    const authcodeRef = doc(db, "authcode", formInput);
    const adminDocSnap: DocumentSnapshot = await getDoc(authcodeRef);

    if (adminDocSnap.exists() && user?.email) {
      const newAdminData = { displayName: user.displayName };
      const newAdminDoc = doc(db, "admin", user?.email);
      await setDoc(newAdminDoc, newAdminData);
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }

    // Reset form input
    setFormInput("");
  };

  return (
    <Protected>
      <>
        <Head>Admin Registration</Head>
        <main className="h-[calc(100vh-60px)] w-full flex flex-col items-center justify-center">
          {/* UCInetID input */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-[80vw] md:w-[25rem] max-w-sm text-base md:text-lg">
              <div className="h-8 flex items-end">
                <p className="text-sm text-lightblue">Admin Code</p>
              </div>
              <input
                type="text"
                className="bg-[#f0f0f0] w-full h-[44px] md:h-[48px] rounded-sm outline-none focus:border-2 focus:border-slate-300 focus:border-l-uciyellow focus:border-l-4 transition duration-500 pl-5 focus:pl-4 tracking-wider font-inter text-gray-600"
                value={formInput}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setFormInput(e.currentTarget.value)
                }
              />
            </div>
            {/* Submit button */}
            <div className="mt-8 bg-gradient-to-r from-[rgba(255,210,0,0.8)] to-[rgba(247,166,45,0.8)] w-[60vw] md:w-[16rem] max-w-sm h-14 rounded-lg">
              <button className="w-full h-full" onClick={handleSubmit}>
                <span className="text-lightblue text-xl font-medium">
                  Submit
                </span>
              </button>
            </div>
          </form>

          {/* Success display */}
          <div className="text-center mt-10">
            {showSuccess === true && (
              <div className="text-green-600">
                <p>Successfully registered as admin.</p>
                <p>
                  Please refresh the page to see your &quot;Manage&quot; option
                  in the navbar.
                </p>
              </div>
            )}
            {showSuccess === false && (
              <div className="text-red">
                <p>Unable to register as admin.</p>
                <p>Invalid authorization code provided.</p>
              </div>
            )}
          </div>
        </main>
      </>
    </Protected>
  );
};

export default Register;
