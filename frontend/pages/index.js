import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authActions, getUserData } from "../store/auth-slice";
import Header from "../components/Header";
import CreatePosts from "../components/CreatePosts";
import MainIMG from "../public/frontimg.jpeg";
export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const loginHandler = () => {
    router.push("/users/sign-in");
  };
  const getData = () => {
    // dispatch(getUserData());
    router.push("/users/turki");
  };

  return (
    <div className="bg-slate-50 h-screen w-screen  m-0 p-0">
      <div style={{ margin: "0 4vw", paddingTop: "4vw" }}>
        <Header />
        <div className="flex items-center    ">
          <div className="ml-20">
            <p></p>
            <p
              className=" -mt-20 font-semibold"
              style={{
                fontSize: "100px",
                // marginLeft: "10rem",
                // marginRight: "35rem",
              }}
            >
              Grow Your Brand
            </p>
            <p
              className="mt-2 text-gray-500"
              style={{ width: "250px", fontSize: "20px" }}
            >
              Grow you're career, showcase your skills and experience, and
              connect with like-minded people
            </p>
            <button
              className="border-2 border-sky-400 p-4  text-black mt-6 w-72 font-bold text-xl"
              onClick={() => router.push("/users/sign-up")}
            >
              Sign Up <span className="text-sm">--it's free</span>
            </button>
          </div>
          <div>
            <Image src={MainIMG} width={700} height={700} objectFit="contain" />
          </div>
        </div>
        {/* {isAuth ? (
        <>
          <button onClick={logoutHandler}>Logout</button>
          <button onClick={getData}>getUserdata</button>
        </>
      ) : (
        <button onClick={loginHandler}>Login</button>
      )} */}
      </div>
    </div>
  );
}
