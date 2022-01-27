import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
// import classes from "./SignUp.module.css";
import MainIMG from "../public/signup.png";
import Image from "next/image";
import classes from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../store/auth-slice";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevPass) => !prevPass);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    dispatch(registerAction(name, email, username, password));
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
          Create an Account
        </h1>

        <TextField
          sx={{ m: 1, width: "90%" }}
          required
          id="outlined-required"
          label="Name"
          inputRef={nameRef}
        />
        <br />
        <TextField
          sx={{ m: 1, width: "90%" }}
          required
          id="outlined-required"
          label="Username"
          type="text"
          inputRef={usernameRef}
        />
        <br />

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
          style={{ width: "90%", height: "50px" }}
          variant="outlined"
        >
          Create an Account
        </Button>
      </form>
    </div>
  );
};
export default SignUp;
