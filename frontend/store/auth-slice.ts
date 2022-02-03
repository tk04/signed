import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
type initState = {
  isAuth: boolean;
  token: string | null;
  userInfo: any;
};
const authState: initState = {
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
    follow(state, action) {
      state.userInfo.following.concat(action.payload);
    },
    unfollow(state, action) {
      state.userInfo.following.splice(action.payload, 1);
    },
    logout(state) {
      Cookies.remove("token");
      state.isAuth = false;
      state.userInfo = {};
      state.token = null;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setFollowingInfo(state, action) {
      if (state.userInfo) {
        state.userInfo.following = action.payload;
      }
    },
  },
});

export const loginAction = (email: string, password: string) => {
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
    dispatch(authActions.setUserInfo(data.user));
  };
};
export const loginGuestAction = () => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: "guest@test.com",
        password: "testpass123",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    Cookies.remove("token");
    Cookies.set("token", data.token, { expires: 10 });
    dispatch(authActions.login({ token: data.token }));
    dispatch(authActions.setUserInfo(data.user));
  };
};
export const registerAction = (
  name: string,
  email: string,
  username: string,
  password: string
) => {
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
    dispatch(authActions.setUserInfo(data.user));
  };
};
export const getUserData = () => {
  return async (dispatch) => {
    const res = await fetch("/api1/users/me");
    if (res.ok) {
      const data = await res.json();
      dispatch(authActions.setUserInfo(data.user));
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
      dispatch(authActions.setUserInfo(data.user));
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
