import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-10 flex justify-center items-center font-primary font-light text-gray-300">
      &copy; {new Date().getFullYear()} Sean Collan Fong
    </div>
  );
};

export default Footer;
