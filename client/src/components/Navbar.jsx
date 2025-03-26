import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white/20 h-12 px-4">
      <div className="font-bold text-xl">
        <span className="text-white">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-black">Man</span>
        <span className="text-white">/&gt;</span>
      </div>
    </nav>
  );
};

export default Navbar;
