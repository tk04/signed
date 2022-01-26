import React from "react";
import classes from "./Header.module.css";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  return (
    <header className={classes.header}>
      <p className={classes.logo}>Signed</p>
      <nav className={classes["main-nav"]}>
        <ul className={classes.ul}>
          <li
            onClick={() => router.push("/users/sign-in")}
            className=" p-2 rounded-full  px-8 cursor-pointer"
          >
            <button>Login</button>
          </li>
          <li
            onClick={() => router.push("/users/sign-up")}
            className="p-2 rounded-full text-white px-8 hover:bg-sky-700 cursor-pointer"
            style={{ backgroundColor: "#a68671" }}
          >
            <button>Sign Up</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
