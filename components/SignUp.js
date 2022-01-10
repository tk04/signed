import React, { useState, useRef } from "react";
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
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../store/auth-slice";
const SignUp = () => {
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
    //   const res = await fetch("/users/signup", {
    //     method: "POST",
    //     body: JSON.stringify({ email, name, password }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   // if(res.ok){
    //   //   useRouter.push("/")
    //   // }else{

    //   // }
    //   const data = await res.json();
    //   console.log(data);
    // };
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
        <p style={{ backgroundColor: "yellow", width: "100%" }}>Welcome</p>
      </Grid>
      <Grid item xs={4}>
        <form onSubmit={submitHandler}>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="outlined-required"
            label="Name"
            inputRef={nameRef}
          />
          <br /> <br />
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="outlined-required"
            label="Email"
            type="email"
            inputRef={emailRef}
          />
          <br /> <br />
          <TextField
            sx={{ m: 1, width: "30ch" }}
            required
            id="outlined-required"
            label="Username"
            type="text"
            inputRef={usernameRef}
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
            Create an Account
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};
export default SignUp;
