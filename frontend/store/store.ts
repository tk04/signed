import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
// import socketSlice from "./socket-slice";
const store = configureStore({
  reducer: { auth: authSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
