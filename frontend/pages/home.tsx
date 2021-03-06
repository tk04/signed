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
import SuccessNotifier from "../components/SuccessNotifier";
import Head from "next/head";
import { RootState } from "../store/store";
const Home = () => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [postLoader, setPostLoader] = useState<boolean>(false);
  const [maxPosts, setMaxPosts] = useState<boolean>(false);
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
  }, [skip, userInfo]);
  const scrollHandler = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSkip((prev) => prev + 3);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const unfollowFilter = (username: string) => {
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
        {showNoti && (
          <SuccessNotifier
            closeHandler={closeNotiHandler}
            message={"Post succesfully sent"}
          />
        )}

        {newpost && (
          <div>
            <CreatePosts onPost={showNotiHandler} />
          </div>
        )}
        <Head>
          <title>Home</title>
          <meta name="description" content="Home" />
        </Head>
        <div className={classes.main}>
          <div className="hidden lg:block w-full ">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <div className=" mt-5">
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
                      alt=""
                    />
                  )}
                  <section className=" bg-slate-50 w-3/4 rounded-full ">
                    <div
                      className="flex justify-between"
                      style={{ width: "95%", paddingBottom: "10px" }}
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
