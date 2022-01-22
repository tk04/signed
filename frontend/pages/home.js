import React, { useEffect, useState } from "react";
import CreatePosts from "../components/CreatePosts";
import SideNav from "../components/SideNav";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "../components/Post";
import CircularProgress from "@mui/material/CircularProgress";
import { BsImage } from "react-icons/bs";
import ImageModal from "../components/ImageModal";
import SearchBox from "../components/SearchBox";
import UserSuggestions from "../components/UserSuggestions";
import { useSelector } from "react-redux";
import Image from "next/image";
import classes from "../components/layout.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Home = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [skip, setSkip] = useState(0);
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

  const closeNotiHandler = () => {
    setShowNoti(false);
  };
  const showNotiHandler = () => {
    setShowNoti(true);
    setTimeout(() => {
      setShowNoti(false);
    }, 5000);
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
        <p>{process.env.NEXT_PUBLIC_tk}</p>
        {showNoti && (
          <div className="flex justify-center flex-nowrap">
            <div
              className="flex justify-center  space-x-10 items-center fixed bg-sky-400 z-30 rounded-2xl text-white font-bold"
              style={{
                bottom: "5vw",
                width: "16rem",
                // height: "40px",
              }}
            >
              <p className="text-center py-2 whitespace-nowrap ">
                Post succesfully sent
              </p>
              <IoIosCloseCircleOutline
                size={20}
                className="cursor-pointer "
                onClick={closeNotiHandler}
              />
            </div>
          </div>
        )}

        {newpost && (
          <div>
            <CreatePosts onPost={showNotiHandler} />
          </div>
        )}

        <div className={classes.main}>
          <div className="hidden lg:block w-full ">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <div className="bg-slate-400 mt-5">
              <h1 className="ml-20 mb-3 font-bold text-lg ">Home</h1>
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
                        Whats on your mind?
                      </p>

                      <BsImage size={25} className="ml-4 mt-3 0 " />
                    </div>
                  </section>
                </div>
              </Link>
            </div>
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
          <div className="hidden lg:block">
            <SearchBox />
            <UserSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
