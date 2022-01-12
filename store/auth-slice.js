import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const authState = {
  isAuth: Cookies.get("token") !== undefined,
  token: Cookies.get("token") ? Cookies.get("token") : null,
  userInfo: null,
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
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const loginAction = (email, password) => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/login", {
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
export const registerAction = (name, email, username, password) => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, username, password }),
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
export const getUserData = () => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/me?basic=true");
    if (res.ok) {
      const data = await res.json();
      dispatch(authActions.setUserInfo(data));
    }
  };
};
export const updateUserData = (fields) => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/me", {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(authActions.setUserInfo(data));
    }
  };
};
export const updateProfilePic = (formData) => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/me/avatar", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders,
    });
    if (res.ok) {
      // const data = await res.json();
      // dispatch(authActions.setUserInfo(data));
      console.log("picture saved");
    }
  };
};

export const authActions = authSlice.actions;
export default authSlice;
