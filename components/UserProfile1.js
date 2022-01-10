import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import headshot from "../pictures/headshot.JPG";
const UserProfile1 = ({ userData }) => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  useEffect(async () => {
    const res = await fetch("/api1/users/me/username");
    if (res.ok) {
      const data = await res.json();
      if (data.username === userData.username) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  }, [token]);
  // console.log(userData.avatar);
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
                    src={`data:image/png;base64,${userData.avatar}`}
                    width={150}
                    height={150}
                    className="rounded-full "
                    layout="fill"
                  />
                </div>
                <h1 className=" mt-5 font-bold text-2xl h-fit">
                  {userData.name}
                </h1>
                <p className="text-gray-400 h-fit">@{userData.username}</p>
              </div>
              <div className="md:flex flex-col ">
                <div className="md:flex text-center mt-3 md:ml-20 md:space-x-7">
                  {userData.keywords.map((keyword, idx) => (
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
              </div>
            </div>
            <div className="flex space-x-5 mt-2 sm:mr-5 content-center justify-center">
              {isUser === false ? (
                <>
                  <button className="bg-slate-100 text-black font-bold h-fit  p-3 rounded-full">
                    DM
                  </button>
                  <button className="bg-slate-100 text-black font-bold h-fit p-3 rounded-full">
                    IR
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    router.push("/settings/profile");
                  }}
                  className="bg-slate-100 text-black font-bold text-sm h-fit whitespace-nowrap p-3 rounded-md"
                >
                  Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="pt-10 mt-10 grid grid-cols-3 bg-slate-50 ">
            <div className="ml-10 ">
              <p className="text-center">Skills / Accomplishments</p>
              <br />
              <ul className="list-disc">
                {userData.accomplishments.map((acc, idx) => (
                  <li key={idx}>{acc}</li>
                ))}
                {/* <li>1580 on SAT</li>
                <li>Won national basketball championship</li>
                <li>1580 on SAT</li>
                <li>Won national basketball championship</li>
                <li>1580 on SAT</li>
                <li>Won national basketball championship</li> */}
              </ul>
            </div>
            <div>
              <p>Testing</p>
            </div>
            <div>
              <p>Testing</p>
            </div>
          </div>
          <div>
            <p>POSTS:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile1;
