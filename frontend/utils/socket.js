import { io } from "socket.io-client";
import Cookies from "js-cookie";
const URL = "http://localhost:4000";
const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: Cookies.get("token"),
  },
});

export default socket;
