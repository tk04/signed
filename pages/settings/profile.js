import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "../../components/UserProfile1";
import Cookies from "js-cookie";
import EditProfile from "../../components/EditProfile";
import { useRouter } from "next/router";
const profile = () => {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  useEffect(async () => {
    const res = await fetch(`/api1/users/me`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setUserData(data.user);
    } else {
      router.push("/");
    }
  }, [token]);
  return (
    <>
      {userData && (
        <>
          <EditProfile userData={userData} />
          <UserProfile userData={userData} />{" "}
        </>
      )}
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
export default profile;
