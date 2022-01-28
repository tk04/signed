import React from "react";
import classes from "./Header.module.css";
import { useRouter } from "next/router";
import { FaSignature } from "react-icons/fa";

const Header: React.FC<{ openLogin: () => void; openSignUp: () => void }> = (
  props
) => {
  const router = useRouter();
  return (
    <header className={classes.header}>
      <div className="flex items-center space-x-2 ">
        <FaSignature size={32} color="#a68671" />
        {/* <h3 className="font-light text-xl text-[#a68671]">Signed</h3> */}
      </div>
      <nav className={classes["main-nav"]}>
        <ul className={classes.ul}>
          <li
            onClick={props.openLogin}
            className=" p-2 rounded-full  px-8 cursor-pointer"
          >
            <button>Login</button>
          </li>
          <li
            onClick={props.openSignUp}
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
