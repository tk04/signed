import React, { useEffect, useState } from "react";
import UserProfile from "../../../components/UserProfile1";
import { useRouter } from "next/router";
import ProfileSettings from "../../../components/ProfileSettings";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../store/auth-slice";
const Users = (props) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const { edit } = router.query;
  const [userData, setUserData] = useState();
  useEffect(async () => {
    if (router.query.uid) {
      const res = await fetch(`/api1/users/${router.query.uid}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    }
  }, [router.query.uid]);
  if (!userInfo) {
    dispatch(getUserData());
  }
  return (
    <>
      {props.data ? (
        <>
          {edit === "true" && props.data.isUser === true && (
            <ProfileSettings userData={userInfo} />
          )}
          {props.data.isUser && userInfo && (
            <UserProfile
              userData={{ user: userInfo, isUser: props.data.isUser }}
            />
          )}
          {!props.data.isUser && <UserProfile userData={props.data} />}
          {/* <UserProfile userData={userData} /> */}
        </>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies.token
    ? `Bearer ${context.req.cookies.token}`
    : null;
  const baseUrl = context.req ? `http://${context.req.headers.host}` : "";
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
  // return {
  //   notFound: true,
  // };
  return {
    props: {},
  };
}
export default Users;
