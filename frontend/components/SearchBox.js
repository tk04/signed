import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import Image from "next/image";
const SearchBox = () => {
  const router = useRouter();
  const textRef = useRef();
  const [openPopup, setOpenPopup] = useState(false);
  const [textVal, setTextVal] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const open = Boolean(openPopup);
  const id = open ? "simple-popover" : undefined;
  // const popupCloseHandler = () => {
  //   setOpenPopup(null);
  // };
  // const handlePopupClick = (e) => {
  //   setOpenPopup(e.currentTarget);
  // };
  const onChangeHandler = (e) => {
    if (e.target.value.trim()) {
      setOpenPopup(true);
    } else {
      setOpenPopup(false);
      setUsers([]);
    }
    setTextVal(e.target.value);
  };
  const closePopupHandler = () => {
    setTimeout(() => {
      setOpenPopup(false);
    }, 500);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await fetch(`api1/search/users?keyword=${textVal}&skip=0`);
      if (data.ok) {
        const res = await data.json();
        setUsers(res);
      }
      setLoading(false);
    };
    if (textVal.trim()) {
      const getUsers = setTimeout(() => {
        fetchUsers();
      }, 500);
      return () => {
        clearTimeout(getUsers);
      };
    }
  }, [textVal]);

  const userClickHandler = (username) => {
    router.push(`/users/${username}`);
  };
  return (
    <>
      <div className="flex items-center mt-3 mx-12 rounded-full pl-4 bg-slate-100 p-1">
        <IoSearchOutline size={25} />
        <input
          type="text"
          placeholder="Search Users"
          className="ml-4 w-3/4 h-10 focus:outline-none bg-slate-100"
          value={textVal}
          onChange={onChangeHandler}
          onBlur={closePopupHandler}
          onFocus={onChangeHandler}
          ref={textRef}
        />
      </div>
      {openPopup && (
        <div
          className="absolute bg-slate-100 h-80 mx-12 rounded-xl mt-3 overflow-y-auto overflow-x-hidden z-10"
          style={{ width: "410px" }}
        >
          {loading && (
            <div className="flex w-full justify-center ">
              <CircularProgress disableShrink />
            </div>
          )}

          {users.length > 0 && (
            <ul className="mt-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex m-3 cursor-pointer"
                  onClick={userClickHandler.bind(null, user.username)}
                >
                  <Image
                    alt=""
                    src={`data:image/png;base64,${user.avatar}`}
                    width={52}
                    height={52}
                    className="rounded-full"
                    layout="fixed"
                  />
                  <section className="ml-2">
                    <h1 className="font-bold">{user.name}</h1>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                    <p className="overflow-hidden block text-ellipsis w-72 h-16 whitespace-nowrap">
                      {user.bio}
                    </p>
                  </section>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* <Popover
        id={id}
        open={open}
        anchorEl={openPopup}
        onClose={popupCloseHandler}
        className="overflow-y-auto w-full  "
        anchorOrigin={{ vertical: 45, horizontal: -35 }}
      >
        <div className="h-80 w-96">
          {users.length > 0 ? (
            <Typography>POPUP OPEN</Typography>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </Popover> */}
    </>
  );
};

export default SearchBox;
