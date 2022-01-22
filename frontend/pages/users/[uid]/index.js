import React, { useEffect, useState } from "react";
import UserProfile from "../../../components/UserProfile1";
import { useRouter } from "next/router";
import ProfileSettings from "../../../components/ProfileSettings";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../store/auth-slice";
import Cookies from "js-cookie";
const Users = (props) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const { edit } = router.query;
  const [userData, setUserData] = useState();
  useEffect(async () => {
    if (router.query.uid) {
      const res = await fetch(`/api1/users/${router.query.uid}/avatar`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    }
  }, [router.query.uid]);
  if (Cookies.get("token")) {
    if (!userInfo) {
      dispatch(getUserData());
    }
  }
  return (
    <div>
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
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies.token
    ? `Bearer ${context.req.cookies.token}`
    : null;
  const baseUrl = context.req ? `http://${context.req.headers.host}` : "";
  console.log(process.env.server);
  const res = await fetch(
    `${process.env.server}/api1/users/${context.params.uid}`,
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
