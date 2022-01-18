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
  const [modalShow, setModalShow] = useState(false);
  const [skip, setSkip] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const { newpost } = router.query;
  useEffect(() => {
    const getP = async () => {
      const data = await fetch(`/api1/feed?skip=${skip}`);
      if (data.ok) {
        const res = await data.json();
        console.log(res.posts);
        setPosts((prev) => prev.concat(res.posts));
      }
    };
    getP();
  }, [skip]);
  const scrollHandler = (e) => {
    // console.log(e.target);
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSkip((prev) => prev + 3);
    }
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
              />
            ))}
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
