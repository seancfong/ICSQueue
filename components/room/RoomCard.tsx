import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {
  roomName: string | string[] | undefined;
};

const RoomCard = ({ roomName }: Props) => {
  return (
    <div className="w-[36rem] h-[28rem] bg-[#FDFDFD] bg-opacity-70 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col justify-center items-center font-primary gap-5">
      {/* Title */}
      <h3 className="text-3xl">Waiting in {roomName}</h3>

      {/* UCInetID label */}
      <div className="bg-gradient-to-r from-[rgba(255,210,0,0.8)] to-[rgba(247,166,45,0.8)] w-[25rem] h-14 rounded-lg flex justify-center items-center">
        <p className="text-lightblue text-xl font-medium">
          <span className="font-semibold">UCInetID:</span> panteatr
        </p>
      </div>

      {/* Current position */}
      <div className="flex flex-col items-center">
        <p className="text-lg">Current position:</p>
        <div className="w-28 h-20 bg-slate-200 bg-opacity-80 rounded-md flex justify-center items-center">
          <p className="text-5xl">14</p>
        </div>
      </div>

      {/* Leave queue option */}
      <a href="/" className="underline text-red font-medium">
        Leave Queue
      </a>
    </div>
  );
};

export default RoomCard;
