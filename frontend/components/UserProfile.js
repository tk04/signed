import React from "react";
import Image from "next/image";
import profilePic from "../pictures/profilePic.png";
import headshot from "../pictures/headshot.JPG";
const UserProfile = () => {
  return (
    <div className="overflow-hidden grid grid-cols-[100%] gap-3 m-0 p-0 lg:grid-cols-[25%_50%_25%] sm:grid-cols-[20%_80%]">
      <h1 className="text-xl font-bold underline hidden sm:block">Hello</h1>
      <div>
        <div className="relative">
          <Image src={profilePic} height={600} />
        </div>
        <div className="bg-slate-50 ">
          <div className="flex relative  bottom-12 sm:left-10 ">
            <Image
              src={headshot}
              width={120}
              height={120}
              className="rounded-full"
            />
            <h1 className="grow relative pt-2 top-12 left-5 text-2xl font-bold">
              TK
            </h1>
            <button className=" self-center right-5  sm:right-12 sm:mr-5 top-5 bg-black hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:border-2 text-white py-2 text-md rounded-3xl px-3  font-bold  ml-5 relative bottom-8">
              connect
            </button>
          </div>{" "}
          <br />
          <p className="relative bottom-12 left-5 pr-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            interdum faucibus turpis, at varius sapien cursus id. Aliquam
            commodo aliquam consequat. Nulla facilisi. Nullam at tincidunt
            sapien. Sed nec dapibus ante. Ut eget viverra diam. Mauris ultricies
            vulputate dolor eget rutrum. Mauris cursus tellus ut erat convallis,
            ut convallis justo sodales. Etiam tincidunt sapien pellentesque
            libero tempus elementum. Cras feugiat cursus tellus. Pellentesque et
            interdum ex. Aenean nisl nulla, sollicitudin in sem eu, pellentesque
            posuere est.
          </p>
          <hr />
        </div>
        <div className="bg-white ml-5">
          <br />
          <br />
          <h1 className="">testing </h1>
        </div>
      </div>

      <div>
        <h1 className="hidden lg:block text-xl font-bold underline">Hello</h1>
      </div>
    </div>
  );
};

export default UserProfile;
