import React, { useEffect, useState } from "react";
import { db } from "@/lib/utils/firebase";
import {
  collection,
  DocumentSnapshot,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import Link from "next/link";

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
  const roomCollection = collection(db, "rooms");

  useEffect(() => {
    const queryAllRooms = async () => {
      let roomArray: Array<roomType> = [];

      const allRooms: QuerySnapshot = await getDocs(roomCollection);
      allRooms.forEach((doc: DocumentSnapshot) => {
        // console.log(doc.id, doc.data());
        roomArray.push({ id: doc.id, data: doc.data() });
      });

      setRooms(roomArray);
    };
    queryAllRooms();
  }, []);
  return (
    <div className="w-[30rem] h-[30rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl p-5 flex flex-col items-center overflow-y-scroll gray-scrollbar">
      <h3 className="text-2xl">All Rooms</h3>
      <ul className="w-full h-full p-2 flex flex-col gap-2">
        {rooms.map(({ id, data }: roomType, i: number) => {
          return (
            <li
              key={id}
              className="w-full h-10 bg-slate-300 bg-opacity-30 rounded-md flex justify-center items-center"
            >
              <Link href={`/admin/${id}`}>{data.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminView;
