import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="sticky font-primary w-full flex justify-center items-center py-3 top-0 z-50 bg-gradient-to-l from-[#0064a4] to-[#1b3d6d] shadow-lg">
      <h1 className="text-3xl text-white font-normal">ICS Queue</h1>
    </div>
  );
};

export default Header;
