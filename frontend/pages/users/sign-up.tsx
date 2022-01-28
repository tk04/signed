import Head from "next/head";
import React from "react";
import SignUpPage from "../../components/SignUp";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up --Signed" />
      </Head>
      <SignUpPage />
    </>
  );
};

export default SignUp;
