import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";

const Post = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [fillH, setFillH] = useState();
  const [loader, setLoader] = useState(true);
  console.log(loader);
  useEffect(() => {
    console.log(props.likes);
    setFillH(userInfo ? props.likes.includes(userInfo.username) : false);
  }, [userInfo]);
  const [likes, setLikes] = useState(props.likes ? props.likes.length : 0);

  const fillHandler = () => {
    setFillH((prev) => {
      if (prev) {
        setLikes(prev - 1);
      } else {
        setLikes(prev + 1);
      }
      return !prev;
    });
    likeHandler();
  };

  const likeHandler = async () => {
    const data = await fetch(`/api1/posts/${props.postId}/like`, {
      method: "POST",
    });
    if (data.ok) {
      const res = await data.json();
      console.log(res);
    }
  };
  const imageClickHandler = (image) => {
    props.modalClick();
    props.imageSrc(image);
  };
  const diableLoaderHandler = (e) => {
    setLoader(false);
    console.log("disabled");
  };

  return (
    <>
      <div className="space-x-4 bg-white p-6 rounded-xl m-4  ">
        <div className="flex items-center justify-between ">
          <div className="flex space-x-2  mb-4 ml-3">
            {props.avatar && (
              <Image
                src={props.avatar}
                width={62}
                height={62}
                className="rounded-full"
                layout="fixed"
              />
            )}
            <div className="flex flex-col">
              <h1 className="font-bold">{props.name}</h1>
              <p className=" text-gray-500">@{props.username}</p>
            </div>
          </div>
          <HiOutlineDotsHorizontal
            size={30}
            className="cursor-pointer -mt-10"
          />
        </div>
        <div>
          <div>
            <div>
              <p>{props.text}</p>
            </div>
            <div
              className="grid  gap-4 grid-flow-col auto-rows-auto  mt-4 justify-center align-center"
              style={{ maxheight: "50px" }}
            >
              {props.images &&
                props.images.map((image, idx) => (
                  <div onClick={imageClickHandler.bind(null, image)} key={idx}>
                    <div>
                      {loader && <CircularProgress disableShrink />}
                      <div className={`${loader ? "w-0 h-0" : ""}`}>
                        <Image
                          src={image}
                          key={idx}
                          width="400"
                          height="350"
                          objectFit="cover"
                          className="overflow-hidden rounded-xl cursor-pointer max-h-96"
                          onLoadingComplete={(e) => diableLoaderHandler(e)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <hr className="mt-6" />
          <div className="flex  mt-6 w-full  justify-evenly">
            <div className="flex space-x-4 cursor-pointer ">
              <BiComment
                size={20}
                className="cursor-pointer hover:text-blue-600 text-gray-500 mt-1"
              />
              <p className="text-md text-gray-500">Comments</p>
            </div>
            <div
              className="flex space-x-4 cursor-pointer"
              onClick={fillHandler}
            >
              {fillH ? (
                <AiFillHeart
                  size={25}
                  className="cursor-pointer text-red-500"
                />
              ) : (
                <AiOutlineHeart
                  size={25}
                  className="cursor-pointer text-gray-500"
                />
              )}
              <p className="text-md text-gray-500">
                <span className="pr-1">{likes}</span> Likes
              </p>
            </div>
            <div className="flex space-x-4 cursor-pointer">
              <IoShareSocialOutline
                size={25}
                className="cursor-pointer text-gray-500"
              />
              <p className="text-md text-gray-500">Shares</p>
            </div>
            <div className="flex space-x-4 cursor-pointer">
              <BsBookmark size={25} className="cursor-pointer text-gray-500" />
              <p className="text-md text-gray-500">Save</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
