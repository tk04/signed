import React, { useEffect, useState } from "react";
import CreatePosts from "../components/CreatePosts";
import SideNav from "../components/SideNav";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "../components/Post";
import ImageModal from "../components/ImageModal";
const home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { newpost } = router.query;
  useEffect(() => {
    const getP = async () => {
      const data = await fetch("/api1/feed");
      if (data.ok) {
        const res = await data.json();
        console.log(res.posts);
        setPosts(res.posts);
      }
    };
    getP();
  }, []);
  return (
    <div
      className=" overflow-auto "
      style={{ backgroundColor: "#f5f5f5", width: "100%", height: "100%" }}
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
          {posts.map((post) => (
            <Post
              username={post.owner.username}
              likes={post.likes}
              name={post.owner.name}
              key={post._id}
              text={post.text}
              images={post.images}
              avatar={`data:image/png;base64,${post.owner.avatar}`}
              postId={post._id}
            />
          ))}
        </div>
        <div>
          <p>last col</p>
        </div>
      </div>
    </div>
  );
};

export default home;
