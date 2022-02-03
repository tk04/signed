import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import SearchBox from "../components/SearchBox";
import UserSuggestions from "../components/UserSuggestions";
import classes from "../components/layout.module.css";
import { useSelector } from "react-redux";
import { BiComment } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import Head from "next/head";
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [type, setType] = useState<"followers" | "likes" | "comments">(
    "followers"
  );

  useEffect(() => {
    const getNoti = async () => {
      const data = await fetch("/api1/noti");
      if (data.ok) {
        const res = await data.json();
        setNotifications(res.notis);
        setFollowers(res.newFollowers);
      }
    };
    getNoti();
  }, []);
  const changeTypeHandler = (newType: "followers" | "likes" | "comments") => {
    setType(newType);
  };
  return (
    <>
      <div
        className="relative w-screen h-screen overflow-y-auto "
        // onScroll={scrollHandler}
      >
        <Head>
          <title>Notifications</title>
          <meta name="description" content="Notifications" />
        </Head>
        <div className={classes.main}>
          <div className="hidden lg:block w-full ">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <div className="bg-slate-400 mt-5">
              <h1 className="ml-20 mb-3 font-bold text-lg ">Notifications</h1>
              <hr className="ml-10" style={{ width: "90%" }} />
            </div>
            <br />
            <br />

            <div className={`justify-between flex w-3/4 ml-20`}>
              <button
                onClick={changeTypeHandler.bind(null, "likes")}
                className={`${
                  type === "likes" && " border-b-2 border-sky-400"
                } `}
              >
                Likes
              </button>
              <button
                onClick={changeTypeHandler.bind(null, "comments")}
                className={`${
                  type === "comments" && " border-b-2 border-sky-400"
                } `}
              >
                Comments
              </button>
              <button
                onClick={changeTypeHandler.bind(null, "followers")}
                className={`${
                  type === "followers" && " border-b-2 border-sky-400"
                } `}
              >
                Followers
              </button>
            </div>
            <div className="ml-20 mt-10 ">
              {notifications.map((post, idx) => (
                <div key={idx}>
                  {type === "comments" && (
                    <div>
                      {post.comments.map((comment) => (
                        <div key={comment._id}>
                          <div className="flex space-x-6 items-center">
                            <BiComment size={25} />
                            <p className="ml-3">
                              <span className="font-bold text-lg">
                                {comment.owner.username}
                              </span>{" "}
                              <span className="font-thin">
                                commented on your post
                              </span>
                            </p>
                          </div>
                          <p className="text-gray-500">{post.text}</p>

                          <br />
                        </div>
                      ))}
                    </div>
                  )}
                  {type === "likes" && (
                    <>
                      {" "}
                      {post.likes.reverse().map((like, idx) => (
                        <div className="flex space-x-4 items-center" key={idx}>
                          <AiFillHeart color="red" />
                          <p>
                            <span className="font-bold text-lg">{like}</span>
                            <span className="font-thin"> liked your post</span>
                          </p>
                          <br />
                          <br />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
              {type === "followers" && (
                <>
                  {followers.map((follower, idx) => (
                    <div className="flex space-x-2 items-center" key={idx}>
                      <BsPersonPlusFill size={25} />
                      <p className="font-bold">
                        {follower.username}
                        <span className="font-thin"> followed you</span>
                      </p>{" "}
                      <br />
                      <br />
                    </div>
                  ))}
                </>
              )}
            </div>

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

export default Notifications;
