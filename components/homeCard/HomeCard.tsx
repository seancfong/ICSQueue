import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {};

const HomeCard = (props: Props) => {
  const [idInput, setIdInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  return (
    <div className="w-[36rem] h-[28rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col justify-center items-center">
      {/* Title */}
      <h3 className="text-3xl">Enter in the queue</h3>

      {/* UCInetID input */}
      <div className="w-[25rem] text-lg">
        <div className="h-8 flex items-end">
          <p className="text-sm text-lightblue">UCInetID</p>
        </div>
        <input
          type="text"
          className="bg-[#f0f0f0] w-full h-[48px] rounded-sm outline-none focus:border-2 focus:border-slate-300 focus:border-l-uciyellow focus:border-l-4 transition duration-500 pl-5 focus:pl-4 tracking-wider font-inter text-gray-600"
          value={idInput}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setIdInput(e.currentTarget.value)
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
        <button className="w-full h-full">
          <span className="text-lightblue text-xl font-medium">Submit</span>
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
