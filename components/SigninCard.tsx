import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "@/lib/context/AuthContext";

type Props = {};

const SigninCard = (props: Props) => {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90vw] sm:w-[36rem] h-[28rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col justify-center items-center gap-5">
      {/* Title */}
      <h3 className="text-3xl px-10 text-center">Welcome to the ICS Queue</h3>

      {/* UCInetID label */}
      <button
        className="bg-[#fafafa] w-[80%] sm:w-[20rem] max-w-sm border-gray-300 border-2 hover:border-gray-500 transition duration-300 h-14 rounded-lg flex justify-center items-center gap-3"
        onClick={handleGoogleSignin}
      >
        <span className="text-3xl">
          <FcGoogle />
        </span>
        <p className="text-gray-700 text-xl font-medium">Sign in with UCI</p>
      </button>
    </div>
  );
};

export default SigninCard;
