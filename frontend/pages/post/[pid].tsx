import React from "react";
import PostPage from "../../components/PostPage";
import { useRouter } from "next/router";
import Head from "next/head";
const Pid = () => {
  const router = useRouter();
  const pid = router.query.pid;
  return (
    <div>
      <>
        <Head>
          <title>Post</title>
          <meta name="description" content="Post information --Signed" />
        </Head>
        <PostPage pid={pid} />
      </>
    </div>
  );
};

export default Pid;
