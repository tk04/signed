import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import ImageModal from "../components/ImageModal";
import SideNav from "../components/SideNav";
import Link from "next/link";
import SearchBox from "../components/SearchBox";
import UserSuggestions from "../components/UserSuggestions";
import { useSelector } from "react-redux";
import { BsImage } from "react-icons/bs";
import Image from "next/image";
import classes from "../components/layout.module.css";

const popular = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch(`/api1/popular?skip=${skip}`);
      if (data.ok) {
        const res = await data.json();
        setPosts((prev) => prev.concat(res));
      }
    };
    getPosts();
    console.log(skip);
  }, [skip]);
  console.log(posts);
  const scrollHandler = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSkip((prev) => prev + 4);
      window.scrollTo(0, document.body.scrollHeight);
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
        <div className={classes.main}>
          <div className="hidden lg:block">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <div className="bg-slate-400 mt-5">
              <h1 className="ml-20 mb-3 font-bold text-lg ">Trending</h1>
              <hr className="ml-10" style={{ width: "90%" }} />
              <Link href="/home?newpost=true" as="/home">
                <div className="flex mt-6 space-x-2 cursor-pointer justify-center">
                  {userInfo && userInfo.avatar && (
                    <Image
                      src={`data:image/png;base64,${userInfo.avatar}`}
                      width={52}
                      height={52}
                      layout="fixed"
                      className="rounded-full"
                    />
                  )}
                  <section className=" bg-slate-50 w-3/4 rounded-full ">
                    <div
                      className="flex justify-between"
                      style={{ width: "95%" }}
                    >
                      <p className="ml-4 mt-3 text-gray-500">
                        {" "}
                        What's on your mind?
                      </p>

                      <BsImage size={25} className="ml-4 mt-3 0 " />
                    </div>
                  </section>
                </div>
              </Link>
            </div>
            <br />
            <br />
            {posts && (
              <>
                {posts &&
                  posts.map((post, idx) => (
                    <Post
                      username={post.owner.username}
                      likes={post.likes}
                      name={post.owner.name}
                      key={post._id}
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
                      // unfollowFilter={unfollowFilter}
                    />
                  ))}
              </>
            )}
            {/* {postLoader === true && (
              <div className="h-40 flex justify-center">
                <CircularProgress />
              </div>
            )} */}
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

export default popular;
