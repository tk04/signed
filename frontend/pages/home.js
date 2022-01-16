import React, { useEffect, useRef } from "react";
import CreatePosts from "../components/CreatePosts";
import SideNav from "../components/SideNav";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "../components/Post";
const home = () => {
  const router = useRouter();
  const { newpost } = router.query;
  return (
    <div
      className="w-screen h-screen overflow-auto "
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {newpost && (
        <div>
          <CreatePosts />
        </div>
      )}

      <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_50%_25%] box-border">
        <div className="hidden lg:block">
          <SideNav />
        </div>
        <div className="flex flex-col  ">
          <Link href="/home?newpost=true" as="/home">
            Create post
          </Link>
          <br />
          <br />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div>
          <p>last col</p>
        </div>
      </div>
    </div>
  );
};

export default home;
