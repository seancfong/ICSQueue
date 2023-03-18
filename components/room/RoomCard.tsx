import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { UserAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { BsCheckCircle } from "react-icons/bs";
import LoadingDots from "../LoadingDots";
import { useLocalStorage } from "react-use";

type Props = {
  roomId: string | undefined;
};

const RoomCard = ({ roomId }: Props) => {
  const [roomName, setRoomName] = useState("");
  const [fullName, setFullName] = useState("");
  const [queuePosition, setQueuePosition] = useState(0);
  const [offQueue, setOffQueue] = useState(false);
  const { user, DEBUG } = UserAuth();
  const router = useRouter();
  const [prevQueue, setPrevQueue, removePrevQueue] = useLocalStorage(
    "prevqueue",
    ""
  );

  // Get room collection ref
  const collectionRef = collection(db, "rooms");

  useEffect(() => {
    const subscribeData = async () => {
      console.log("subscribing");
      if (roomId && user && user.email) {
        console.log("found ", roomId);
        // First get the room info
        const roomRef = doc(db, "rooms", roomId);

        const document: DocumentSnapshot = await getDoc(roomRef);
        const data = document.data();

        if (data) {
          const { name } = data;
          setRoomName(name);
          setPrevQueue(name);
        }

        // Then subscribe to the room's queue
        const queueRef = collection(db, `rooms/${roomId}/queued`);
        const queueQuery = query(queueRef, orderBy("createdAt"));

        onSnapshot(queueQuery, (queueSnapshot: QuerySnapshot) => {
          console.log("Update to queue");
          // console.log(queueSnapshot.docs);

          let position = 1;
          let found = false;

          // Find the user's position in the queue
          queueSnapshot.docs.forEach((doc: DocumentSnapshot) => {
            const data = doc.data();
            // console.log(">", data?.email);

            if (data?.email == user.email) {
              found = true;
              setFullName(data?.fullName);
            }

            if (!found) {
              position++;
            }
          });

          setQueuePosition(position);
          if (!found) {
            setOffQueue(true);
          }
        });
      }
    };
    subscribeData();
  }, [roomId, user]);

  const handleLeave = () => {
    const userRef = doc(db, `rooms/${roomId}/queued`, user.email ?? "");
    console.log(userRef);
    deleteDoc(userRef).then(() => {
      removePrevQueue();
      console.log("leaving queue");
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>
          [{queuePosition}] in {roomName}
        </title>
      </Head>
      <div className="w-[90vw] sm:w-[36rem] h-[28rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col justify-center items-center font-primary gap-5">
        {/* Title */}
        <div className="flex flex-col items-center">
          <h3 className="text-3xl">Waiting in {roomName}</h3>
          <LoadingDots />
        </div>

        {/* UCInetID label */}
        <div className="bg-slate-200 bg-opacity-80 w-[80vw] md:w-[25rem] max-w-sm h-12 md:h-14 rounded-lg flex justify-center items-center">
          <p className="text-lightblue text-lg md:text-xl font-medium">
            <span className="font-semibold">Name:</span> {fullName}
          </p>
        </div>

        {/* Current position */}
        <div className="flex flex-col items-center">
          <p className="text-lg">Current position:</p>
          <div className="w-28 h-20 bg-gradient-to-r from-[rgba(255,210,0,0.8)] to-[rgba(247,166,45,0.8)] rounded-md flex justify-center items-center">
            <p className="text-5xl">
              {offQueue ? <BsCheckCircle /> : queuePosition}
            </p>
          </div>
        </div>

        {/* Leave queue option */}
        <button
          className="underline text-red font-medium"
          onClick={handleLeave}
        >
          Leave Queue
        </button>
      </div>
    </>
  );
};

export default RoomCard;
