import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "../../components/SideNav";
import SearchBox from "../../components/SearchBox";
import UserSuggestions from "../../components/UserSuggestions";
import classes from "../../components/layout.module.css";
import msgClasses from "../../components/msg.module.css";
import { useRouter } from "next/router";
import socket from "../../utils/socket";
const DM = () => {
  const router = useRouter();
  const msgRef = useRef();
  const { dm } = router.query;
  const [disabled, setDisable] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    const join = async () => {
      socket.emit("join", dm);
      socket.on("test", () => {
        console.log("TESTING");
      });
    };
    if (dm) {
      join();
    }
    return () => {
      socket.disconnect();
    };
  }, [dm]);

  const msgHandler = async (e) => {
    // console.log("sending msg");
    e.preventDefault();

    socket.emit("newMessage", msgRef.current.value);
  };
  useEffect(() => {
    socket.on("message", (msg) => {
      // setMessages((prev) => prev.concat(msg));
    });
    socket.on("joined", () => {
      setDisable(false);

      console.log("joined successfully");
    });
    socket.on("failed", () => {
      setError(true);
    });

    socket.on("loadMessages", (data) => {
      // setMessages((prev) => prev.concat(data));
    });
  }, [socket]);
  console.log(messages);
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
            {error && <p>testing</p>}
            {messages[0] !== null &&
              messages.map((msg, idx) => (
                <p key={idx}>
                  <span className="text-gray-500">{msg.from[0]} </span>
                  {msg.body}
                </p>
              ))}
            <form
              onSubmit={msgHandler}
              className={msgClasses.main}
              style={{ bottom: "5vh" }}
            >
              {disabled ? (
                <input
                  type="text"
                  className="border-2 border-black h-10 rounded-xl pl-2 focus:outline-none w-4/5 lg:w-96 "
                  // style={{ width: "40vw" }}
                  ref={msgRef}
                  disabled
                />
              ) : (
                <input
                  type="text"
                  className="border-2 border-black h-10 rounded-xl pl-2 focus:outline-none w-4/5 lg:w-96"
                  // style={{ width: "40vw" }}
                  ref={msgRef}
                />
              )}
            </form>
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

export default DM;
