import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
const Post = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [fillH, setFillH] = useState(false);

  const fillHandler = () => {
    setFillH((prev) => !prev);
  };
  return (
    <div className="space-x-4 w-3/4" style={{ width: "40rem" }}>
      <div className="flex items-center justify-between ">
        <div className="flex space-x-2  mb-4 ml-3">
          {userInfo && (
            <Image
              src={`data:image/png;base64,${userInfo.avatar}`}
              width={62}
              height={62}
              className="rounded-full"
              layout="fixed"
            />
          )}
          <div className="flex flex-col">
            <h1 className="font-bold">Turki</h1>
            <p className=" text-gray-500">@tk</p>
          </div>
        </div>
        <HiDotsHorizontal size={30} className="cursor-pointer" />
      </div>
      <div>
        <div>
          <div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>
        </div>
        <hr className="mt-6" />
        <div className="flex space-x-6 w-full mt-4">
          <div className="flex space-x-2">
            <BiCommentDetail
              size={30}
              className="cursor-pointer hover:text-blue-600 text-gray-500"
            />
            <p className="text-xl text-gray-500">Comments</p>
          </div>
          <div className="flex space-x-6 cursor-pointer" onClick={fillHandler}>
            {fillH ? (
              <AiFillHeart
                size={30}
                className="cursor-pointer text-red-500"
                onClick={fillHandler}
              />
            ) : (
              <AiOutlineHeart
                size={30}
                className="cursor-pointer hover:text-red-500 text-gray-500"
                onClick={fillHandler}
              />
            )}
            <p className="text-xl text-gray-500">Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
