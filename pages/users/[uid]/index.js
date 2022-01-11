import React from "react";
import UserProfile from "../../../components/UserProfile1";
import { useRouter } from "next/router";
import ProfileSettings from "../../../components/ProfileSettings";
import Cookies from "js-cookie";
const Users = (props) => {
  const router = useRouter();
  const { edit } = router.query;

  return (
    <>
      {props.data ? (
        <>
          {edit === "true" && <ProfileSettings />}
          <UserProfile userData={props.data} />
        </>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token
    ? `Bearer ${context.req.cookies.token}`
    : null;
  const res = await fetch(
    `http://localhost:3000/api1/users/${context.params.uid}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    return {
      props: { data },
    };
  }
  return {
    props: {},
  };
  // } else {
  //   return {
  //     props: {},
  //   };
  // }
};
export default Users;
