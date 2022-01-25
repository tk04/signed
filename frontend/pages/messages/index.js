import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav";
import SearchBox from "../../components/SearchBox";
import UserSuggestions from "../../components/UserSuggestions";
import classes from "../../components/layout.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
const Messages = () => {
  const router = useRouter();
  const [DMs, setDMs] = useState([]);
  useEffect(() => {
    const getDMs = async () => {
      const data = await fetch("/api1/messages");
      if (data.ok) {
        const res = await data.json();
        setDMs(res);
        console.log(res);
      }
    };
    getDMs();
  }, []);
  return (
    <>
      <div
        className="relative w-screen h-screen overflow-y-auto "
        // onScroll={scrollHandler}
      >
        <div className={classes.main}>
          <div className="hidden lg:block w-full ">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <div className="bg-slate-400 mt-5">
              <h1 className="ml-20 mb-3 font-bold text-lg ">Messages</h1>
              <hr className="ml-10" style={{ width: "90%" }} />
            </div>
            <br />
            <br />
            {DMs.length > 0 &&
              DMs.map((dm) => (
                <div key={dm._id}>
                  <div
                    className="flex ml-20  p-10 cursor-pointer"
                    onClick={() =>
                      router.push(`messages/${dm.users[0].username}`)
                    }
                  >
                    {dm.users.length > 0 && (
                      <div>
                        <Image
                          src={`data:image/png;base64,${dm.users[0].avatar}`}
                          width={52}
                          height={52}
                          className="rounded-full"
                          layout="fixed"
                        />
                      </div>
                    )}
                    <div className=" ml-3">
                      <p className="font-bold text-lg">{dm.users[0].name}</p>
                      <p className="text-gray-400">@{dm.users[0].username}</p>
                      <p className="text-gray-400">
                        {dm.body.length > 0 && dm.body[dm.body.length - 1].body}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
          <div className="hidden lg:block">
            <SearchBox />
            <UserSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
