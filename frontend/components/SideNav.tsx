import React, { useEffect, useState } from "react";
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
import { RootState } from "../store/store";
import { MdLogout } from "react-icons/md";
import { authActions } from "../store/auth-slice";
import classes from "./Header.module.css";
import { FaSignature } from "react-icons/fa";
import sdClasses from "./layout.module.css";
const SideNav = () => {
  const userData1 = useSelector((state: RootState) => state.auth.userInfo);
  const [userData, setUserData] = useState<any>(
    userData1 ? userData1.user : {}
  );
  const dispatch = useDispatch();
  console.log(userData1);
  useEffect(() => {
    if (userData1) {
      setUserData(userData1);
    } else {
      dispatch(getUserData());
    }

    // setUserData(userData1.user);
  }, [userData1]);
  // console.log(userData);
  const router = useRouter();
  const onHover =
    "px-4 py-2 my-4 hover:bg-slate-50 rounded-full hover:cursor-pointer";
  return (
    <nav className={sdClasses.sideNav}>
      <div className="flex flex-col  w-full  ">
        <FaSignature className={classes.sidenav} color="#cbb8aa" />
        <div
          className={`flex space-x-4 w-fit pr-12  ${onHover} `}
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
        <div
          className={`flex space-x-4   ${onHover}`}
          onClick={() => router.push("/messages")}
        >
          <BiMessageRoundedDetail size={35} />
          <p className="font-bold mt-1">Messages</p>
        </div>
        <div
          className={`flex space-x-4    ${onHover}`}
          onClick={() => {
            router.push("/notifications");
          }}
        >
          <MdNotificationsNone className="" size={35} />
          <p className="font-bold mt-1 ">Notifications</p>
        </div>
        <div
          className={`flex space-x-4 ml-2    ${onHover}`}
          onClick={() => {
            router.push("/");
            dispatch(authActions.logout());
          }}
        >
          <MdLogout size={35} />
          <p className="font-bold mt-1 ">Logout</p>
        </div>
        <Link href="/home?newpost=true">
          <div
            style={{ backgroundColor: "#cbb8aa" }}
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
            {userData.avatar && (
              <Image
                alt=""
                src={`data:image/png;base64,${userData.avatar}`}
                className="rounded-full "
                width={52}
                height={52}
              />
            )}
            {userData.name && userData.username && (
              <div className="ml-3">
                <p className="font-bold text-md">{userData.name}</p>
                <p className="text-gray-400">@{userData.username}</p>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default SideNav;
