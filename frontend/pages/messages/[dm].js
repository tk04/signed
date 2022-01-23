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
// const socket = io.connect("http://localhost:4000");
import { socketActions } from "../../store/socket-slice";
const DM = () => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.socket.socket);
  console.log(socket);
  useEffect(() => {
    dispatch(socketActions.initSocket());
  }, []);
  const router = useRouter();
  const msgRef = useRef();
  const { dm } = router.query;
  const [disabled, setDisable] = useState(false);
  const [messages, setMessages] = useState([]);

  //   if (dm) {
  // const manager = new Manager("http://localhost:4000", {
  //   autoConnect: true,
  //   query: {
  //     toUser: dm,
  //   },
  // });
  // useEffect(() => {
  //   if (dm) {
  //     socket.emit("join", dm);
  //   }
  // }, [dm]);

  // socket.on("connect", () => {
  //   console.log(socket.connected); // true
  // });

  // socket.on("authorized", () => {
  //   console.log("AUTHORIZED");
  //   setDisable(false);
  // });
  // socket.emit("hello", "from client");

  const msgHandler = (e) => {
    console.log("sending msg");
    e.preventDefault();
    // socket.emit("newMessage", {
    //   body: msgRef.current.value,
    //   to: "tk",
    // });
  };
  // console.log(socket);

  // socket.on("message", (msg) => {
  //   setMessages((prev) => prev.concat(msg));
  //   console.log("MESSAGE SENT TO ROOMS");
  // });

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
            {messages.map((msg, idx) => (
              <p key={idx}>{msg.body}</p>
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
