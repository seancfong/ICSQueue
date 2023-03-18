import React, { useEffect, useState } from "react";
import { db } from "@/lib/utils/firebase";
import {
  addDoc,
  collection,
  DocumentSnapshot,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

interface roomData {
  name: string;
}

type roomType = {
  id: string;
  data: roomData | any;
};

type Props = {};

const AdminView = (props: Props) => {
  const [rooms, setRooms] = useState<Array<roomType>>([]);
  const [formInput, setFormInput] = useState<string>("");
  const [roomInput, setRoomInput] = useState<boolean>(false);

  const roomCollection = collection(db, "rooms");
  const roomQuery = query(roomCollection, orderBy("createdAt"));

  const router = useRouter();

  // useEffect on first component render
  useEffect(() => {
    const { deleteSuccess } = router.query;

    if (deleteSuccess) {
      toast.success("Room successfully deleted.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    const queryAllRooms = async () => {
      onSnapshot(roomQuery, (snapshotDocs: QuerySnapshot) => {
        let roomArray: Array<roomType> = [];

        snapshotDocs.forEach((doc: DocumentSnapshot) => {
          console.log(doc.id, doc.data());
          roomArray.push({ id: doc.id, data: doc.data() });
        });

        setRooms(roomArray);
      });
    };
    queryAllRooms();
  }, []);

  const handleAddRoom = async (newRoomName: string) => {
    // Get reference to collection
    const roomRef = collection(db, "rooms");

    // Add new room doc
    const newRoom = await addDoc(roomRef, {
      name: newRoomName,
      createdAt: serverTimestamp(),
    });

    toast.success(`Room ${newRoomName} added.`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />

      <div className="w-[90vw] sm:w-[30rem] h-[30rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl p-5 flex flex-col items-center overflow-y-scroll gray-scrollbar">
        <h3 className="text-2xl">All Rooms</h3>
        <ul className="w-full h-full p-2 flex flex-col gap-2">
          {rooms.map(({ id, data }: roomType, i: number) => {
            return (
              <li
                key={id}
                className="w-full h-10 bg-slate-300 bg-opacity-30 rounded-md flex justify-center items-center gap-2"
              >
                <Link
                  href={`/admin/${id}`}
                  className="font-medium w-full h-full flex items-center justify-center"
                >
                  {data?.name}
                </Link>
              </li>
            );
          })}
          <li className="w-full h-10 bg-gradient-to-r from-[rgba(255,210,0,0.8)] to-[rgba(247,166,45,0.8)] rounded-md flex justify-center items-center gap-2">
            {roomInput ? (
              <form
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleAddRoom(formInput.toUpperCase());
                  setFormInput("");
                }}
                className="flex justify-center"
              >
                <motion.input
                  initial={{ scaleX: 0.2 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  type="text"
                  className="bg-transparent outline-none border-0 border-b-2 border-gray-400 font-medium uppercase text-center"
                  value={formInput}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setFormInput(e.currentTarget.value)
                  }
                  autoFocus={true}
                  onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                    setRoomInput(false);
                    setFormInput("");
                  }}
                />
              </form>
            ) : (
              <button
                className="w-full h-full flex items-center justify-center text-lightblue font-medium"
                onClick={() => {
                  setRoomInput(true);
                }}
              >
                Add New Room
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminView;
