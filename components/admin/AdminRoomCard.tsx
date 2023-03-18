import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
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
import { FiXCircle } from "react-icons/fi";
import parseEmail from "@/lib/utils/parseEmail";

type RoomUsers = {
  data: DocumentData | undefined;
  id: string;
};

type Props = {
  roomId: string | undefined;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
};

const AdminRoomCard = ({ roomId, roomName, setRoomName }: Props) => {
  const [queuedUsers, setQueuedUsers] = useState<Array<RoomUsers>>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { user, DEBUG } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    const subscribeData = async () => {
      if (roomId && user && user.email) {
        // console.log("found ", roomId);
        // First get the room info
        const roomRef = doc(db, "rooms", roomId);

        const document: DocumentSnapshot = await getDoc(roomRef);
        const data = document.data();

        if (data) {
          const { name } = data;
          setRoomName(name);
        }

        // Then subscribe to the room's queue
        const queueRef = collection(db, `rooms/${roomId}/queued`);
        const queueQuery = query(queueRef, orderBy("createdAt"));

        onSnapshot(queueQuery, (queueSnapshot: QuerySnapshot) => {
          //   console.log("Update to queue");
          // console.log(queueSnapshot.docs);

          let newQueuedUsers: Array<RoomUsers> = [];

          // Find the user's position in the queue
          queueSnapshot.docs.forEach((doc: DocumentSnapshot) => {
            const data = doc.data();
            // console.log(">", data?.email);
            newQueuedUsers.push({ data: data, id: doc.id });
          });

          setQueuedUsers(newQueuedUsers);
          //   console.log(queuedUsers);
        });
      }
    };
    subscribeData();
  }, [roomId, user?.email]);

  const handleRemove = (studentId: string) => {
    const userRef = doc(db, `rooms/${roomId}/queued`, studentId);

    deleteDoc(userRef).then(() => {
      console.log(`removing ${studentId} from queue`);
    });
  };

  return (
    <>
      <Head>
        <title>Watching {roomName}</title>
      </Head>
      <div className="w-[90vw] sm:w-[36rem] h-[28rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col items-center font-primary gap-5 overflow-y-scroll gray-scrollbar pt-10">
        {/* Title */}
        <h3 className="text-3xl px-10 md:px-0 text-center">
          {queuedUsers.length} currently in {roomName}
        </h3>

        <ol className="list-decimal flex flex-col gap-3 w-full px-5 md:px-10">
          {queuedUsers.map(({ data: user, id }, i: number) => {
            return (
              <li
                key={id}
                className={
                  "w-full h-min sm:h-10 py-1 sm:py-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 relative bg-opacity-30 " +
                  (hoveredItem == user?.email
                    ? "bg-gradient-to-r from-[rgba(255,210,0,0.6)] to-[rgba(247,166,45,0.7)]"
                    : "bg-slate-300")
                }
                onMouseEnter={() => {
                  setHoveredItem(user?.email);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                }}
              >
                <div className="absolute left-0 flex justify-center items-center text-slate-400 opacity-80 text-xl w-14 h-full">
                  {i + 1}.
                </div>
                <h5 className="font-medium text-lg">{user?.fullName}</h5>
                <p className="text-uciblue">
                  ({parseEmail(user?.email ?? "").netId})
                </p>

                <button
                  className="absolute right-0 flex justify-center items-center text-red text-xl w-14 h-full"
                  onClick={() => {
                    handleRemove(id);
                  }}
                >
                  <FiXCircle />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default AdminRoomCard;
