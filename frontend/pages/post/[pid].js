import React from "react";
import PostPage from "../../components/PostPage";
import { useRouter } from "next/router";
const Pid = () => {
  const router = useRouter();
  const pid = router.query.pid;
  return (
    <div>
      <PostPage pid={pid} />
    </div>
  );
};

export default Pid;
