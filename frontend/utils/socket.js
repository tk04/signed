import { io } from "socket.io-client";
import Cookies from "js-cookie";
const URL = "https://signed-be.herokuapp.com/";
const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: Cookies.get("token"),
  },
});

export default socket;
