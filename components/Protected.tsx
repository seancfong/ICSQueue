import React from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

const Protected = ({ children }: Props) => {
  const router = useRouter();

  const { user } = UserAuth();
  if (!user) {
    router.push("/");
  }

  return children;
};

export default Protected;
