import React, { useState, useRef } from "react";
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
import classes from "./SignUp.module.css";
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

    // const res = await fetch("/users/login", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log(res);
    // if (res.ok) {
    //   router.push("/");
    // } else {
    // }
    // const data = await res.json();
    // console.log(data);
  };

  return (
    <Grid
      className={classes.el}
      container
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={7}>
        <p>Login Page</p>
      </Grid>
      <Grid item xs={4}>
        <form onSubmit={submitHandler}>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="outlined-required"
            label="Email"
            type="email"
            inputRef={emailRef}
          />
          <br /> <br />
          <FormControl required sx={{ m: 1, width: "30ch" }} variant="outlined">
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
          <br />
          <Button
            type="submit"
            size="large"
            style={{ width: "58%", height: "100%" }}
            variant="outlined"
          >
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
