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
import Image from "next/image";
import Head from "next/head";
const DM = () => {
  const router = useRouter();
  const msgRef = useRef<HTMLInputElement>();
  const { dm } = router.query;
  const [disabled, setDisable] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  const [toInfo, setToInfo] = useState<{
    avatar: string;
    username: string;
    name: string;
  }>({ avatar: "", username: "", name: "" });

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
    e.preventDefault();
    const currentVal = msgRef.current.value;
    socket.emit("newMessage", currentVal);
    msgRef.current.value = "";
  };
  useEffect(() => {
    socket.on("message", (msg: string) => {
      setMessages((prev) => prev.concat(msg));
    });
    socket.on("joined", () => {
      setDisable(false);

      console.log("joined successfully");
    });
    socket.on("failed", () => {
      router.push("/messages");
    });

    socket.on("loadMessages", (data) => {
      setMessages((prev) => prev.concat(data));
    });
    socket.on("userInfo", (data) => {
      setToInfo(data);
    });
  }, [socket]);
  console.log(messages);
  return (
    <>
      <div
        className="relative w-screen h-screen overflow-y-auto "
        // onScroll={scrollHandler}
      >
        <Head>
          <title>Message</title>
          <meta name="description" content="Messages" />
        </Head>
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
            <div
              className="ml-20"
              style={{
                marginBottom: "5rem",
                height: "77vh",
                overflow: "auto",
              }}
            >
              {messages[0] !== null &&
                messages.map((msg, idx) => (
                  <div key={idx} style={{ margin: "20px" }}>
                    {msg.isUser != dm ? (
                      <div
                        className="flex items-center m-10"
                        style={{
                          justifyContent: "flex-end",
                          marginRight: "5rem",
                        }}
                      >
                        <div
                          className=" text-white bg-sky-400 rounded-xl "
                          style={{ padding: "5px 20px" }}
                        >
                          <p className="">{msg.body}</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex space-x-5 bg-gray-100 rounded-xl items-center pl-4"
                        style={{ marginRight: "80px" }}
                      >
                        {toInfo.avatar && (
                          <div style={{ paddingTop: "5px" }}>
                            <Image
                              src={`data:image/png;base64,${toInfo.avatar}`}
                              width={42}
                              height={42}
                              className="rounded-full"
                              alt=""
                              layout="fixed"
                            />
                          </div>
                        )}
                        {/* <p className="text-gray-500">{msg.isUser}</p> */}
                        <p style={{ padding: "5px 20px" }}>{msg.body}</p>
                      </div>
                    )}
                  </div>
                ))}
              <br />
              <br />
            </div>
            <form
              onSubmit={msgHandler}
              className={msgClasses.main}
              style={{ bottom: "5vh" }}
            >
              {disabled ? (
                <input
                  type="text"
                  className="border-2 border-gray-600 h-10 rounded-xl pl-2 focus:outline-none w-4/5 lg:w-96 "
                  // style={{ width: "40vw" }}
                  ref={msgRef}
                  disabled
                />
              ) : (
                <input
                  type="text"
                  className="h-10 rounded-xl pl-2 focus:outline-none w-4/5 lg:w-96"
                  style={{ border: "2px solid rgb(203 213 225)" }}
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
