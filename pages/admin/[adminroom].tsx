import Admin from "@/components/Admin";
import AdminRoomCard from "@/components/admin/AdminRoomCard";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineWarning } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/utils/firebase";

type Props = {};

const AdminRoom = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<string>("");
  const [modalSubmit, setShowModalSubmit] = useState<boolean>(false);

  const [deleteBackground, setDeleteBackground] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");

  const router = useRouter();
  const { adminroom } = router.query;

  // console.log(router.query);

  const roomId =
    typeof adminroom == "string" || typeof adminroom == "undefined"
      ? adminroom
      : adminroom[0];

  const handleDeleteRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (roomId) {
      const roomRef = doc(db, "rooms", roomId);

      await deleteDoc(roomRef);

      router.push({ pathname: "/admin", query: { deleteSuccess: true } });
    }
  };

  useEffect(() => {
    if (modalInput != "" && roomName != "" && modalInput === roomName) {
      setShowModalSubmit(true);
    } else {
      setShowModalSubmit(false);
    }
  }, [modalInput]);

  return (
    <Admin>
      <>
        <Head>
          <title>Waiting in Queue</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="font-primary dot-texture h-[calc(100vh-60px)] w-full relative">
          {/* Delete Button */}
          <div
            className="absolute right-10 top-5 bg-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] bg-opacity-50 rounded-lg overflow-hidden"
            onMouseEnter={() => {
              setDeleteBackground(true);
            }}
            onMouseLeave={() => {
              setDeleteBackground(false);
            }}
          >
            <div className="relative h-full w-full">
              <AnimatePresence>
                {deleteBackground && (
                  <motion.div
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    exit={{ opacity: 0, x: "-100%" }}
                    className="bg-rose-600 w-full h-full absolute z-0"
                  />
                )}
              </AnimatePresence>
              <button
                className={
                  "px-5 py-2 z-10 relative transition duration-500 delay-300 font-medium " +
                  (deleteBackground ? "text-white" : "text-red")
                }
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Delete Room
              </button>
            </div>
          </div>

          {/* Admin Card */}
          <div className="w-full h-full flex justify-center items-center">
            <AdminRoomCard
              roomId={roomId}
              roomName={roomName}
              setRoomName={setRoomName}
            />
          </div>

          {/* Delete modal */}
          <AnimatePresence>
            {showModal && (
              <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center z-20">
                {/* Modal background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-400 bg-opacity-50 top-0 left-0 w-full h-full absolute"
                  onClick={() => {
                    setShowModal(false);
                  }}
                />

                {/* Modal content */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative w-[90vw] sm:w-[25rem] h-[20rem] bg-[#FDFDFD] rounded-2xl flex flex-col justify-center items-center font-primary px-5 text-center gap-5"
                >
                  <div className="flex flex-col items-center">
                    <AiOutlineWarning className="text-5xl text-yellow-500" />
                    <h3 className="text-2xl font-medium text-red">
                      Deleting room
                    </h3>
                    <p className="font-medium">
                      Warning: This action cannot be undone!
                    </p>
                  </div>

                  <motion.form layout="position" onSubmit={handleDeleteRoom}>
                    <div className="relative z-40 bg-white">
                      <p className="italic text-gray-500">
                        Type &quot;
                        <span className="not-italic font-medium text-black">
                          {roomName}
                        </span>
                        &quot; to confirm the deletion.
                      </p>
                      <input
                        type="text"
                        className="bg-transparent outline-none border-2 border-gray-300 w-[80%] h-8 rounded-lg text-center uppercase font-semibold text-red placeholder:text-gray-300 mt-1"
                        autoFocus={true}
                        placeholder={roomName}
                        value={modalInput}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                          setModalInput(e.currentTarget.value.toUpperCase())
                        }
                      />
                    </div>
                    {modalSubmit && (
                      <motion.button
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="z-0 relative mt-3 bg-rose-600 text-white px-5 py-2 rounded-lg font-medium"
                      >
                        Confirm
                      </motion.button>
                    )}
                  </motion.form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </>
    </Admin>
  );
};

export default AdminRoom;
