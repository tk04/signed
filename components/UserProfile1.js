import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import headshot from "../pictures/headshot.JPG";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import Link from "next/link";
const UserProfile1 = ({ userData }) => {
  console.log(Object.keys(userData.user.socials[0])[0]);
  const router = useRouter();
  const postContent = <p>No posts</p>;
  const [userContent, setUserContent] = useState({
    type: "posts",
    content: postContent,
  });
  // const userContent = <p>WOW</p>;
  const changeContentHandler = (type) => {
    if (type === "skills") {
      const content = (
        <ul className="list-none text-center bg-gray-50 mt-10 p-10">
          {userData.user.accomplishments.map((acc, idx) => (
            <li
              key={idx}
              className=" hover:border-2 hover:border-slate-300 hover:cursor-pointer p-7"
            >
              {acc}
            </li>
          ))}
        </ul>
      );
      setUserContent({ content, type: "skills" });
    } else if (type === "posts") {
      setUserContent({ content: postContent, type: "posts" });
    } else if (type === "experience") {
      setUserContent({ content: <p>No experience</p>, type: "experience" });
    }
  };
  return (
    <div className=" grid grid-cols-[100%] m-0 p-0 lg:grid-cols-[25%_75%] box-border">
      <div className="hidden lg:block">
        <h1>Testing</h1>
      </div>
      <div className="mt-7h-screen">
        <div className="bg-white justify-between h-fit ">
          <div className="md:flex md:justify-between  h-fit">
            <div className="md:flex">
              <div className="flex flex-col items-center justify-center ">
                <div className="relative w-40 h-40 z-0">
                  <Image
                    src={`data:image/png;base64,${userData.user.avatar}`}
                    className="rounded-full "
                    layout="fill"
                  />
                </div>
                <h1 className=" mt-5 font-bold text-2xl h-fit">
                  {userData.user.name}
                </h1>
                <p className="text-gray-400 h-fit">@{userData.user.username}</p>
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
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
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
                          <a target="_blank" href={item.youtube}>
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
            <div className="flex space-x-5 mt-2 sm:mr-5 content-center justify-center">
              {!userData.isUser && (
                <>
                  <button className="bg-slate-100 text-black font-bold h-fit  p-3 rounded-full">
                    DM
                  </button>
                  <button className="bg-slate-100 text-black font-bold h-fit p-3 rounded-full">
                    IR
                  </button>
                </>
              )}
              {userData.isUser === true && (
                <div className="bg-slate-100 text-black font-bold text-sm h-fit whitespace-nowrap p-3 rounded-md">
                  <Link href={`/users/${userData.user.username}?edit=true`}>
                    Edit profile
                  </Link>
                </div>
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

          {userContent.content}
        </div>
      </div>
    </div>
  );
};

export default UserProfile1;
