import React from "react";
import SideNav from "../components/SideNav";

const home = () => {
  return (
    <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_75%] box-border">
      <SideNav />
    </div>
  );
};

export default home;
