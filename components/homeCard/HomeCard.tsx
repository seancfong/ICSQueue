import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "@/lib/context/AuthContext";

type Props = {};

const HomeCard = (props: Props) => {
  const { user } = UserAuth();

  const [nameInput, setNameInput] = useState(user?.displayName ?? "");
  const [roomInput, setRoomInput] = useState("");

  // const collectionRef = collection(db, "rooms");

  const handleSubmit = () => {
    console.log(nameInput, roomInput.toUpperCase());

    // const docRef = doc(db, "rooms", "TEST");
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
