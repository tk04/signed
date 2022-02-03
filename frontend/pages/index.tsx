import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import MainIMG from "../public/main1.jpeg";
import classes from "../styles/Home.module.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import LoginForm from "../components/LoginForm";
import SignUp from "../components/SignUp";
import { useDispatch } from "react-redux";
import { loginGuestAction } from "../store/auth-slice";
export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openS, setOpenS] = useState<boolean>(false);
  // const open = Boolean(openPopup);
  // const id = open ? "simple-popover" : undefined;
  const popupCloseHandler = () => {
    if (open || openS) {
      setOpen(false);
      setOpenS(false);
    }
  };
  const handlePopupClick = () => {
    setOpen(true);
  };
  const pop2CloseHandler = () => {
    if (openS) {
      setOpenS(false);
    }
  };
  const handlePopup2Click = () => {
    setOpenS(true);
  };
  const guestHandler = () => {
    dispatch(loginGuestAction());
    router.push("/home");
  };
  return (
    <div className="bg-slate-50 overflow-x-hidden h-screen">
      <Head>
        <title>Signed --Homepage</title>
        <meta
          name="description"
          content="A social plateform that helps you grow your career and network with like-minded individuals"
        />
      </Head>
      <div
        className={`${
          openS || open ? "block" : "hidden"
        } z-20 bg-gray-500/50 w-screen h-screen fixed`}
        onClick={popupCloseHandler}
      ></div>
      <div
        className={`fixed flex justify-center items-center  z-20 ${
          open ? "block" : "hidden"
        }`}
      >
        <LoginForm />
      </div>

      <div
        className={`fixed flex justify-center items-center  z-20 ${
          openS ? "block" : "hidden"
        }`}
      >
        <SignUp />
      </div>
      <div
        className="flex flex-col content-between  bg-slate-50"
        onClick={pop2CloseHandler}
      >
        <div className={classes.headerMain}>
          <Header openSignUp={handlePopup2Click} openLogin={handlePopupClick} />
          <div className="flex items-center justify-evenly">
            <div
              className="md:ml-20 flex flex-col"
              // style={{ alignItems: "center" }}
            >
              <p className={classes.mainText}>
                Grow Your
                <br /> Brand
              </p>
              <p
                className="mt-2 text-gray-500 "
                style={{ width: "250px", fontSize: "20px" }}
              >
                Grow you&apos;re career, showcase your skills and experience,
                and connect with like-minded people
              </p>
              <button
                className=" p-4  text-white mt-6 w-full md:w-72 font-semibold text-xl"
                style={{ backgroundColor: "#cbb8aa" }}
                onClick={handlePopup2Click}
              >
                Get Started <span className="text-sm">--it&apos;s free</span>
              </button>
              {/* <button
                className="border-2 p-4  text-black mt-2 w-full md:w-72 font-semibold text-xl"
                style={{ borderColor: "#cbb8aa" }}
                onClick={handlePopup2Click}
              >
                continue as guest{" "}
              </button> */}
              <button
                className="text-gray-400 mt-2 "
                style={{ fontSize: "15px" }}
                onClick={guestHandler}
              >
                Sign-in as guest
              </button>
            </div>
            <div className="hidden sm:block ">
              <Image
                src={MainIMG}
                width={700}
                height={700}
                objectFit="contain"
                alt=""
              />
            </div>
          </div>
        </div>
        <footer
          className={classes.footer}
          style={{
            bottom: "0",
            fontSize: "12px",
            overflowX: "hidden",

            overflowWrap: "break-word",
          }}
        >
          <p>About</p>
          <p>Help Center</p>
          <p>Terms of Service</p>
          <p>Private Policy</p>
          <p>Cookie Policy</p>
          <p>Accessibility</p>
          <p>Ads info</p>
          <p>Blog</p>
          <p>Status</p>
          <p>Careers</p>
          <p>Brand Resources</p>
          <p>Advertising</p>
          <p>Marketing</p>
          <p>Signed for Business</p>
          <p>Developers</p>
          <p>Directory</p>
          <p>Settings</p>
          <p>&copy; Signed, inc.</p>
        </footer>
      </div>
    </div>
  );
}
