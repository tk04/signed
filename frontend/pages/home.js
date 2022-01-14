import React from "react";
import SideNav from "../components/SideNav";
import { getData } from "./api/users/[uid]";
import axios from "axios";
const home = () => {
  return (
    <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_75%] box-border">
      <SideNav />
    </div>
  );
};
export async function getServerSideProps(context) {
  // const token = context.req.cookies.token
  //   ? `Bearer ${context.req.cookies.token}`
  //   : null;
  // console.log(context.req.url);
  // const baseUrl = context.req ? `http://${context.req.headers.host}` : "";
  // const res = await fetch(`${baseUrl}/api/users/tk`);
  // console.log(res);
  // if (res.ok) {
  //   const data = await res.json();
  //   console.log(data);
  //   return {
  //     props: { data },
  //   };
  // }
  // // return {
  // //   notFound: true,
  // // };
  // console.log("not found");
  const data = await axios.get("http://localhost:3000/api/users/tk04");
  if (data.ok) {
    const res = await data.json();
  }
  // const data = await getData(null, "tk");
  // console.log(data);
  return {
    props: {},
  };
}
export default home;
