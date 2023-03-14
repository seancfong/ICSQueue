import React from "react";
import Header from "./header";

type Props = {
  children: JSX.Element;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default layout;
