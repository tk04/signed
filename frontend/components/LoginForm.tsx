import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, Button } from "@mui/material";
// import classes from "./SignUp.module.css";
import MainIMG from "../public/login4.png";
import Image from "next/image";
import classes from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/auth-slice";
import { RootState } from "../store/store";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const token = useSelector((state: RootState) => state.auth.token);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevPass) => !prevPass);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current.value;
    dispatch(loginAction(email, password));
  };
  useEffect(() => {
    if (isAuth) {
      router.push("/home");
    }
  }, [isAuth]);

  return (
    <div className="">
      <form
        onSubmit={submitHandler}
        className="flex flex-col fixed justify-center items-center w-[500px] bg-gray-50 p-20 pt-32  border-b-[20px] border-zinc-300 rounded-md   left-1/2"
        style={{ transform: "translate(-50%, -50%)", top: "50%" }}
      >
        <h1 className="absolute top-16 font-light text-2xl from-inherit">
          Sign in
        </h1>
        <TextField
          sx={{ m: 1, width: "90%" }}
          required
          id="outlined-required"
          label="Email"
          type="email"
          inputRef={emailRef}
        />
        <br />
        <FormControl required sx={{ m: 1, width: "90%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <br />
        <br />
        <Button
          type="submit"
          size="large"
          style={{ width: "90%", height: "50px", marginLeft: "10px" }}
          variant="outlined"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
