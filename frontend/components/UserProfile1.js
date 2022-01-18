import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import Link from "next/link";
import SideNav from "./SideNav";
import Post from "./Post";
import ImageModal from "./ImageModal";
import { authActions } from "../store/auth-slice";
const UserProfile1 = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [avatar, setAvatar] = useState(
    userData.user ? userData.user.avatar : null
  );
  const [modalShow, setModalShow] = useState();
  const [posts, setPosts] = useState([]);
  const [postSkip, setPostSkip] = useState(0);
  const [imageSrc, setImageSrc] = useState();
  const [following, setFollowing] = useState(userData.isFollowing);
  const [userContent, setUserContent] = useState({
    type: "posts",
  });
  console.log(userData.user._id);
  const scrollHandler = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setPostSkip((prev) => prev + 3);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      const postRes = await fetch(
        `/api1/posts/${userData.user._id}?skip=${postSkip}`
      );
      if (postRes.ok) {
        const pData = await postRes.json();

        setPosts((prev) => prev.concat(pData));
      }
    };
    getPosts();
  }, [postSkip]);
  const changeContentHandler = (type) => {
    if (type === "skills") {
      const content = (
        <>
          {userData.user.accomplishments.length > 0 ? (
            <ul className="list-none text-center bg-slate-50 mt-10 p-10">
              {userData.user.accomplishments.map((acc, idx) => (
                <li
                  key={idx}
                  className=" hover:border-2 hover:border-slate-300 hover:cursor-pointer p-7 text-lg"
                >
                  {acc}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 w-full text-center ">
              No accomplishments listed
            </div>
          )}
        </>
      );
      setUserContent({ content, type: "skills" });
    } else if (type === "posts") {
      setUserContent({ type: "posts" });
    } else if (type === "experience") {
      const content = (
        <>
          {userData.user.experiences.length > 0 ? (
            <ul className="mt-8 space-y-4 bg-slate-50 w-full">
              {userData.user.experiences.map((item, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer hover:border-2 hover:border-slate-300 hover:cursor-pointer p-7 text-lg "
                >
                  <h2 className=" font-bold">{item.org_name}</h2>
                  <p className=" text-gray-500">{item.position}</p>
                  <p className="mt-3 text-sm">{item.description}</p>
                </div>
              ))}
            </ul>
          ) : (
            <div className="mt-8 w-full text-center ">No experience listed</div>
          )}
        </>
      );
      setUserContent({ content, type: "experience" });
    }
  };
  const followHandler = async () => {
    setFollowing((prev) => {
      const followingSet = new Set(userInfo.following);
      if (prev) {
        followingSet.delete(userData.user.username);

        dispatch(authActions.setFollowingInfo(Array.from(followingSet)));
      } else {
        followingSet.add(userData.user.username);
        dispatch(authActions.setFollowingInfo(Array.from(followingSet)));
      }

      return !prev;
    });
    const data = await fetch(`/api1/users/${userData.user._id}/follow`, {
      method: "POST",
    });
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
        className=" grid grid-cols-[100%] m-0 p-0 lg:grid-cols-[25%_60%] box-border w-full h-screen overflow-y-scroll"
        onScroll={scrollHandler}
      >
        <div className="hidden lg:block">
          <SideNav />
        </div>
        <div className="mt-7 h-full  ">
          <div className="bg-white justify-between h-fit  ">
            <div className="md:flex md:justify-between  h-fit">
              <div className="md:flex">
                <div className="flex flex-col items-center justify-center ">
                  <div className="relative w-40 h-40 z-0">
                    {avatar && (
                      <Image
                        src={`data:image/png;base64,${avatar}`}
                        className="rounded-full "
                        layout="fill"
                      />
                    )}
                  </div>
                  <h1 className=" mt-5 font-bold text-2xl h-fit">
                    {userData.user.name}
                  </h1>
                  <p className="text-gray-400 h-fit">
                    @{userData.user.username}
                  </p>
                </div>
                <div className="md:flex flex-col ">
                  <div className="md:flex text-center mt-3 md:ml-20 md:space-x-7">
                    {userData.user.keywords.map((keyword, idx) => (
                      <p className="bg-slate-100 h-fit p-3 font-bold" key={idx}>
                        {keyword}
                      </p>
                    ))}
                    {/* <p className="bg-slate-100 h-fit p-3 font-bold">Lifestyle</p>
                  <p className="bg-slate-100 h-fit p-3 font-bold">Basketball</p>
                  <p className="bg-slate-100 h-fit p-3 font-bold">
                    Photography
                  </p> */}
                  </div>
                  <div className="flex gap-4 md:ml-20 mt-3 mb-5 justify-center md:justify-start">
                    <p className="text-xl">
                      1,142{" "}
                      <span className=" text-sm text-gray-400">followers</span>
                    </p>
                    <p className="text-xl">
                      100{" "}
                      <span className=" text-sm text-gray-400">following</span>
                    </p>
                  </div>
                  <p className="ml-20 mt-2 text-left">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  {userData.user.socials && (
                    <div className="flex md:ml-20 space-x-5 justify-center md:justify-start ">
                      {userData.user.socials.map((item, idx) => (
                        <section key={item._id}>
                          {Object.keys(item)[0] === "twitter" && (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`https://twitter.com/${item.twitter}`}
                            >
                              <AiOutlineTwitter
                                className=" mt-5 cursor-pointer"
                                size={25}
                              />
                            </a>
                          )}
                          {Object.keys(item)[0] === "instagram" && (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`https://instagram.com/${item.instagram}`}
                            >
                              <AiFillInstagram
                                className="mt-5 cursor-pointer"
                                onClick={() => {}}
                                size={25}
                              />
                            </a>
                          )}
                          {Object.keys(item)[0] === "youtube" && (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={item.youtube}
                            >
                              <AiFillYoutube
                                className="mt-5 cursor-pointer"
                                onClick={() => {}}
                                size={25}
                              />
                            </a>
                          )}
                        </section>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-5 mt-2 md:mr-5 content-center justify-center">
                {!userData.isUser && (
                  <>
                    <button
                      className="bg-slate-100 text-black font-bold h-fit  p-3 rounded-full"
                      onClick={followHandler}
                    >
                      {following ? "Following" : "Follow"}
                    </button>
                    <button className="bg-slate-100 text-black font-bold h-fit p-3 rounded-full">
                      IR
                    </button>
                  </>
                )}
                {userData.isUser === true && (
                  <Link href={`/users/${userData.user.username}?edit=true`}>
                    <div className="bg-slate-100 text-black font-bold text-sm h-fit whitespace-nowrap p-3 mt-1 rounded-md cursor-pointer">
                      Edit profile
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="pt-5 pb-3 mt-10 grid grid-cols-3 bg-slate-50 text-center rounded-full">
              <div className="ml-10">
                <button
                  className={`text-center ${
                    userContent.type === "skills" && "border-b-2 border-sky-400"
                  }`}
                  onClick={changeContentHandler.bind(null, "skills")}
                >
                  Skills / Accomplishments
                </button>
              </div>
              <div>
                <button
                  className={`text-center ${
                    userContent.type === "posts" && "border-b-2 border-sky-400"
                  }`}
                  onClick={changeContentHandler.bind(null, "posts")}
                >
                  Posts
                </button>
              </div>
              <div>
                <button
                  className={`text-center ${
                    userContent.type === "experience" &&
                    "border-b-2 border-sky-400"
                  }`}
                  onClick={changeContentHandler.bind(null, "experience")}
                >
                  Experience
                </button>
              </div>
            </div>
            {userContent.type === "posts" ? (
              <div className="flex flex-col w-full mt-10 ">
                <div className="mx-24 ">
                  {posts.map((post) => (
                    <Post
                      avatar={`data:image/png;base64,${userData.user.avatar}`}
                      name={userData.user.name}
                      username={userData.user.username}
                      text={post.text}
                      images={post.images}
                      modalClick={() => setModalShow(true)}
                      imageSrc={(image) => setImageSrc(image)}
                      key={post._id}
                      postId={post._id}
                      likes={post.likes}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <> {userContent.content}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile1;
