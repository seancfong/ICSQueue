import React from "react";
import { useRouter } from "next/router";
import RoomCard from "@/components/room/RoomCard";
import Head from "next/head";
import Protected from "@/components/Protected";

type Props = {};

const RoomName = (props: Props) => {
  const router = useRouter();
  const { roomname } = router.query;

  console.log(router.query);

  return (
    <>
      <Head>
        <title>Waiting in Queue</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-primary dot-texture h-[calc(100vh-60px)] w-full">
        <div className="w-full h-full flex justify-center items-center">
          <Protected>
            <RoomCard
              roomId={
                typeof roomname == "string" || typeof roomname == "undefined"
                  ? roomname
                  : roomname[0]
              }
            />
          </Protected>
        </div>
      </main>
    </>
  );
};

export default RoomName;
