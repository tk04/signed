import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import SearchBox from "../components/SearchBox";
import UserSuggestions from "../components/UserSuggestions";
import classes from "../components/layout.module.css";
import { useSelector } from "react-redux";
import { BiComment } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
const Messages = () => {
  return (
    <>
      <div
        className="relative w-screen h-screen overflow-y-auto "
        // onScroll={scrollHandler}
      >
        <div className={classes.main}>
          <div className="hidden lg:block w-full ">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <div className="bg-slate-400 mt-5">
              <h1 className="ml-20 mb-3 font-bold text-lg ">Messages</h1>
              <hr className="ml-10" style={{ width: "90%" }} />
            </div>
            <br />
            <br />
            <p>testing</p>
          </div>
          <div className="hidden lg:block">
            <SearchBox />
            <UserSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
