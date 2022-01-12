import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { HiTrendingUp } from "react-icons/hi";
import { AiOutlineNotification } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
const SideNav = () => {
  const onHover =
    "px-7 py-2 my-4 hover:bg-slate-50 rounded-full hover:cursor-pointer";
  return (
    <nav className="flex flex-col items-center justify-center relative top-48 right-10  space-x-6">
      <div className={`flex space-x-4 ${onHover}`}>
        <TiHomeOutline size={35} />
        <p className="font-bold mt-1">Home</p>
      </div>
      <div className={`flex space-x-4 ml-5 ${onHover} `}>
        <HiTrendingUp size={35} />
        <p className="font-bold mt-1">Trending</p>
      </div>
      <div className={`flex space-x-4 ml-7 ${onHover}`}>
        <BiMessageRoundedDetail size={35} />
        <p className="font-bold mt-1">Messages</p>
      </div>
      <div className={`flex space-x-4 relative left-3 ${onHover}`}>
        <AiOutlineNotification size={35} />
        <p className="font-bold mt-1">Notifications</p>
      </div>
    </nav>
  );
};

export default SideNav;
