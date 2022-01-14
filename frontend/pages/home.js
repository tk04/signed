import React, { useEffect, useRef } from "react";
import SideNav from "../components/SideNav";
import { getData } from "./api/users/[uid]";
const home = () => {
  const postRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await fetch("/api1/posts", {
      method: "POST",
      body: JSON.stringify({ text: postRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.ok) {
      const res = await data.json();
      console.log(res);
    }
  };

  const getPosts = async () => {
    const res = await fetch("/api1/posts/tk");
    const data = await res.json();
    console.log(data);
  };
  getPosts();

  return (
    <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_75%] box-border">
      <div>
        <SideNav />
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <label>Post:</label>
          <input type="text" ref={postRef} />
        </form>
      </div>
    </div>
  );
};

export default home;
