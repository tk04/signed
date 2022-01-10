import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authActions, getUserData } from "../store/auth-slice";
import Header from "../components/Header";
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
    <div>
      <Header />
      {isAuth ? (
        <>
          <button onClick={logoutHandler}>Logout</button>
          <button onClick={getData}>getUserdata</button>
        </>
      ) : (
        <button onClick={loginHandler}>Login</button>
      )}
    </div>
  );
}
