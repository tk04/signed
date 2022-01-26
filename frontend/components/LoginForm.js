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
const LoginForm = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const router = useRouter();
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevPass) => !prevPass);
  };

  const submitHandler = async (e) => {
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
    <div className="grid grid-cols-[100%] lg:grid-cols-[70%_30%]">
      <div className=" hidden lg:block bg-slate-100">
        <div className="flex flex-col items-center">
          <div className="mt-10 flex flex-col items-center space-y-4">
            <p
              className={`${classes.welcome} text-5xl`}
              style={{ fontFamily: "'Neonderthaw', cursive" }}
            >
              Welcome{" "}
            </p>
            <p>Login with your email & password to continue</p>
          </div>
          <div className="absolute bottom-4">
            <Image src={MainIMG} width={500} height={500} objectFit="contain" />
          </div>
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center  h-screen "
      >
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
