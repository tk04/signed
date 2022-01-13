import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile1";
import Cookies from "js-cookie";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";
const ProfileSettings = (props) => {
  // const userInfo = useSelector((state) => state.auth.userInfo);
  // // console.log(avatar || "i was null");
  // if (userInfo) {
  //   props.userData.avatar = userInfo.avatar;
  // }
  const router = useRouter();
  console.log(props.userData);
  // const [userData, setUserData] = useState();
  // console.log(userData);
  // useEffect(async () => {
  //   const res = await fetch(`/api1/users/me`);
  //   if (res.ok) {
  //     try {
  //       const data = await res.json();
  //       console.log(data);
  //       setUserData(data.user);
  //     } catch (e) {
  //       console.log("error happened");
  //     }
  //   } else {
  //     router.push("/");
  //   }
  // }, []);
  return (
    <>
      {props.userData && <EditProfile userData={props.userData} />}
      {/* hello */}
    </>
  );
};
// export const getServerSideProps = async (context) => {
//   console.log(Cookies.get("token"));
//   const res = await fetch(`http://localhost:4000/api1/users/me`, {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   });
//   console.log(res);
//   if (res.ok) {
//     const data = await res.json();
//     return {
//       props: { data },
//     };
//   }
//   return {
//     props: {},
//   };
//   // } else {
//   //   return {
//   //     props: {},
//   //   };
//   // }
// };
export default ProfileSettings;
