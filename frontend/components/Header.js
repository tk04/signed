import React from "react";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <header className={classes.header}>
      <p className={classes.logo}>Signed</p>
      <nav className={classes["main-nav"]}>
        <ul className={classes.ul}>
          <li className={classes.list}>test1</li>
          <li className={classes.list}>test2</li>
          <li className={classes.list}>test3</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
