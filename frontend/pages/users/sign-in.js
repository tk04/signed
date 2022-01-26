import Head from "next/head";
import React from "react";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login --Signed" />
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
