import React, { useEffect } from "react";
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
        </>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
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
      notFound: true,
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
};
export default Users;
