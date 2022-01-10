import React from "react";
import UserProfile from "../../../components/UserProfile1";
import { useRouter } from "next/router";
import ProfileSettings from "../../../components/ProfileSettings";
const Users = (props) => {
  const router = useRouter();
  const { edit } = router.query;

  return (
    <>
      {props.data ? (
        <>
          {edit === "true" && <ProfileSettings />}
          <UserProfile userData={props.data.user} />
        </>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:4000/api1/users/${context.params.uid}`
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
