import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
const authState = {
  isAuth: Cookies.get("token") !== undefined,
  token: Cookies.get("token") ? Cookies.get("token") : null,
};
const authSlice = createSlice({
  name: "Auth",
  initialState: authState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload.token;
    },
    logout(state) {
      Cookies.remove("token");
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const loginAction = (email, password) => {
  return async (dispatch) => {
    const res = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    Cookies.remove("token");
    Cookies.set("token", data.token, { expires: 10 });
    dispatch(authActions.login({ token: data.token }));
  };
};
export const registerAction = (name, email, password) => {
  return async (dispatch) => {
    const res = await fetch("/users/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(authActions.login({ token: data.token }));
  };
};

export const authActions = authSlice.actions;
export default authSlice;
