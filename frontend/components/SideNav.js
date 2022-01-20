import React, { useEffect } from "react";
// import { TiHomeOutline } from "react-icons/ti";
import { RiHomeSmileLine } from "react-icons/ri";
import { HiTrendingUp } from "react-icons/hi";
// import { AiOutlineNotification } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../store/auth-slice";
import Cookies from "js-cookie";
import Link from "next/link";
const SideNav = () => {
  const userData = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  // console.log(userData);
  if (Cookies.get("token")) {
    if (!userData) {
      dispatch(getUserData());
    }
  }
  // useEffect(() => {
  //   dispatch(getUserData());
  // }, []);
  // console.log(userData);
  const router = useRouter();
  const onHover =
    "px-7 py-2 my-4 hover:bg-slate-50 rounded-full hover:cursor-pointer";
  return (
    <nav className=" fixed flex flex-col items-center pt-32 h-screen place-content-between ml-32 ">
      <div className="flex flex-col items-start p-0 m-0 w-full ">
        <div
          className={`flex space-x-4  ${onHover} `}
          onClick={() => router.push("/home")}
        >
          <RiHomeSmileLine className="font-bold" size={35} />
          <p className="font-bold mt-1 ">Home</p>
        </div>
        <div
          className={`flex space-x-4     ${onHover} `}
          onClick={() => router.push("/popular")}
        >
          <HiTrendingUp size={35} />
          <p className="font-bold mt-1">Trending</p>
        </div>
        <div className={`flex space-x-4   ${onHover}`}>
          <BiMessageRoundedDetail size={35} />
          <p className="font-bold mt-1">Messages</p>
        </div>
        <div className={`flex space-x-4    ${onHover}`}>
          <MdNotificationsNone className="" size={35} />
          <p className="font-bold mt-1 ">Notifications</p>
        </div>
        <Link href="/home?newpost=true">
          <div
            className={`flex space-x-4  w-full items-center ml-5  justify-center bg-sky-500 rounded-full px-7 py-2 my-4 cursor-pointer hover:bg-sky-600`}
          >
            <p className="text-lg py-0.5  font-bold text-white ">Post</p>
          </div>
        </Link>
      </div>
      <div
        className={`flex mb-10 justify-center w-full ml-7  ${onHover}`}
        onClick={() => {
          router.push(`/users/${userData.username}`);
        }}
      >
        {userData && (
          <>
            {" "}
            <Image
              src={`data:image/png;base64,${userData.avatar}`}
              className="rounded-full "
              width={52}
              height={52}
            />
            <div className="ml-3">
              <p className="font-bold text-md">{userData.name}</p>
              <p className="text-gray-400">@{userData.username}</p>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default SideNav;
