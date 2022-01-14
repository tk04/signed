import React, { useEffect, useRef } from "react";
import CreatePosts from "../components/CreatePosts";
import SideNav from "../components/SideNav";
const home = () => {
  return (
    <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_75%] box-border">
      <div>
        <SideNav />
      </div>
      <div>
        <CreatePosts />
      </div>
    </div>
  );
};

export default home;
