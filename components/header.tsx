import React, { useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { TbUserCircle, TbLogout } from "react-icons/tb";
import { AiFillWarning } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import parseEmail from "@/lib/utils/parseEmail";

type Props = {};

const Header = (props: Props) => {
  const { user, logOut } = UserAuth();
  const { netId, isUCI } = parseEmail(user?.email);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  console.log(netId, isUCI);

  const handleSignOut = async () => {
    try {
      setShowLogout(false);
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky font-primary w-full flex justify-center items-center py-3 top-0 z-50 bg-gradient-to-l from-[#0064a4] to-[#1b3d6d] shadow-lg">
      <a href="/" className="text-3xl text-white font-normal">
        ICS Queue
      </a>
      {user?.displayName && (
        <div className="absolute right-0 top-0 h-full flex flex-col justify-center items-center pr-16 text-white">
          <button
            className="flex gap-2 items-center"
            onClick={() => {
              setShowLogout((showLogout) => !showLogout);
            }}
          >
            {isUCI ? (
              <>
                <TbUserCircle className="text-xl" />
                <span className="tracking-wider"> {netId ?? ""}</span>
              </>
            ) : (
              <>
                <AiFillWarning className="text-xl text-yellow-500" />
                <span className="tracking-wider"> {netId ?? ""}</span>
              </>
            )}
          </button>
          <div className="relative">
            <AnimatePresence>
              {showLogout && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -100, x: "-50%" }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                  className="absolute top-2 w-32 h-12 bg-slate-100 bg-opacity-90 rounded-lg text-gray-700 flex justify-center items-center shadow-md"
                >
                  <button className="flex gap-2" onClick={handleSignOut}>
                    <TbLogout className="text-2xl text-gray-500" />
                    <span className="font-medium">Log out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
