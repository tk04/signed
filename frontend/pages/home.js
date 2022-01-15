import React, { useEffect, useRef } from "react";
import CreatePosts from "../components/CreatePosts";
import SideNav from "../components/SideNav";
import { useRouter } from "next/router";
import Link from "next/link";
const home = () => {
  const router = useRouter();
  const { newpost } = router.query;
  return (
    <>
      {newpost && (
        <div>
          <CreatePosts />
        </div>
      )}

      <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_75%] box-border">
        <div>
          <SideNav />
        </div>
        <Link href="/home?newpost=true" as="/home">
          Create post
        </Link>
      </div>
    </>
  );
};

export default home;
