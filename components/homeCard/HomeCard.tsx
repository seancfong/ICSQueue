import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { UserAuth } from "@/lib/context/AuthContext";
import { db } from "@/lib/utils/firebase";
import { useRouter } from "next/router";

type Props = {};

const HomeCard = (props: Props) => {
  const router = useRouter();
  const { user, DEBUG } = UserAuth();

  const [nameInput, setNameInput] = useState(user?.displayName ?? "");
  const [roomInput, setRoomInput] = useState("");

  const collectionRef = collection(db, "rooms");

  const handleSubmit = async (event: React.FormEvent) => {
    // console.log(nameInput, roomInput.toUpperCase());

    // Prevent form from refreshing the browser
    event.preventDefault();

    // Create query for checking room validity
    const roomQuery = query(
      collectionRef,
      where("name", "==", roomInput.toUpperCase())
    );
    const snapshot: QuerySnapshot = await getDocs(roomQuery);
    const [room] = snapshot.docs;

    if (room && user.email) {
      // Room exists
      console.log("Room found", room.id);

      // Check if user exists already
      const queueCollection = collection(db, `rooms/${room.id}/queued`);
      const queueQuery = query(
        queueCollection,
        where("email", "==", user.email)
      );

      const presentQueue = await getDocs(queueQuery);

      if (presentQueue.docs.length > 0) {
        // User is present in queue, router push early
        router.push("/room/" + room.id);
      } else {
        // Add the user to the room
        const queueRef = doc(
          db,
          `rooms/${room.id}/queued`,
          DEBUG ? nameInput : user.email
        );

        const userData = {
          fullName: nameInput,
          email: DEBUG ? nameInput : user.email,
          createdAt: serverTimestamp(),
        };
        await setDoc(queueRef, userData);

        if (!DEBUG) {
          router.push("/room/" + room.id);
        }
      }
    } else {
      console.log("Room not found");
    }
  };

  return (
    <div className="w-[36rem] h-[28rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col justify-center items-center">
      {/* Title */}
      <h3 className="text-3xl">Enter in the queue</h3>

      {/* UCInetID input */}
      <form onSubmit={handleSubmit}>
        <div className="w-[25rem] text-lg">
          <div className="h-8 flex items-end">
            <p className="text-sm text-lightblue">Full Name</p>
          </div>
          <input
            type="text"
            className="bg-[#f0f0f0] w-full h-[48px] rounded-sm outline-none focus:border-2 focus:border-slate-300 focus:border-l-uciyellow focus:border-l-4 transition duration-500 pl-5 focus:pl-4 tracking-wider font-inter text-gray-600"
            value={nameInput}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setNameInput(e.currentTarget.value)
            }
          />
        </div>

        {/* Room name input */}
        <div className="w-[25rem]">
          <div className="h-8 flex items-end">
            <p className="text-sm text-lightblue">Room Name</p>
          </div>
          <input
            type="text"
            className="bg-[#f0f0f0] w-full h-[48px] rounded-sm outline-none focus:border-2 focus:border-slate-300 focus:border-l-uciyellow focus:border-l-4 transition duration-500 pl-5 focus:pl-4 tracking-wider font-inter text-gray-600 uppercase"
            value={roomInput}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setRoomInput(e.currentTarget.value)
            }
          />
        </div>

        {/* Submit button */}
        <div className="mt-8 bg-gradient-to-r from-[rgba(255,210,0,0.8)] to-[rgba(247,166,45,0.8)] w-[25rem] h-14 rounded-lg">
          <button className="w-full h-full" onClick={handleSubmit}>
            <span className="text-lightblue text-xl font-medium">Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeCard;
