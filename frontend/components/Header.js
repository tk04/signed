import React from "react";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <header className={classes.header}>
      <p className={classes.logo} className="text-2xl font-semibold">
        Signed
      </p>
      <nav className={classes["main-nav"]}>
        <ul className={classes.ul}>
          <li className={classes.list} className=" p-2 rounded-full  px-8">
            <button>Login</button>
          </li>
          <li
            className={classes.list}
            className="bg-sky-400 p-2 rounded-full text-white px-8 hover:bg-sky-700"
          >
            <button>Get started</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
