import React, { useEffect, useState } from "react";
import CreatePosts from "../components/CreatePosts";
import SideNav from "../components/SideNav";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "../components/Post";
import CircularProgress from "@mui/material/CircularProgress";

import ImageModal from "../components/ImageModal";
const home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [skip, setSkip] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [postLoader, setPostLoader] = useState(false);
  const [maxPosts, setMaxPosts] = useState(false);
  const { newpost } = router.query;
  useEffect(() => {
    const getP = async () => {
      setPostLoader(true);
      const data = await fetch(`/api1/feed?skip=${skip}`);
      if (data.ok) {
        const res = await data.json();
        if (res.posts.length === 0) {
          setMaxPosts(true);
        }
        setPosts((prev) => prev.concat(res.posts));
      }
      setPostLoader(false);
    };
    if (!maxPosts) {
      getP();
    }
  }, [skip]);
  const scrollHandler = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSkip((prev) => prev + 3);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const unfollowFilter = (username) => {
    console.log("filtering");
    setPosts((prev) => prev.filter((post) => post.owner.username !== username));
  };
  return (
    <>
      {modalShow && (
        <ImageModal
          show={modalShow}
          src={imageSrc}
          removeHandler={() => setModalShow(false)}
        />
      )}
      <div
        className="relative w-screen h-screen overflow-y-auto "
        onScroll={scrollHandler}
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
            {posts.map((post, idx) => (
              <Post
                username={post.owner.username}
                likes={post.likes}
                name={post.owner.name}
                key={idx}
                text={post.text}
                images={post.images}
                avatar={`data:image/png;base64,${post.owner.avatar}`}
                postId={post._id}
                modalClick={() => setModalShow(true)}
                imageSrc={(image) => setImageSrc(image)}
                userId={post.owner._id}
                commentCount={post.comments.length}
                commentTo={
                  post.commentTo ? post.commentTo.owner.username : null
                }
                unfollowFilter={unfollowFilter}
              />
            ))}
            {postLoader === true && (
              <div className="h-40 flex justify-center">
                <CircularProgress />
              </div>
            )}
          </div>
          <div>
            <p>last col</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
