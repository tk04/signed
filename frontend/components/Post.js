import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { MdDeleteForever } from "react-icons/md";
import { RiUserUnfollowLine } from "react-icons/ri";
import Comment from "./Comment";
import { useRouter } from "next/router";
import Link from "next/link";
import SuccessNotifier from "./SuccessNotifier";
const Post = (props) => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(null);
  const [openCommentPopup, setOpenCommentPopup] = useState(null);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [fillH, setFillH] = useState();
  const [loader, setLoader] = useState(true);
  const [postHidden, setPostHidden] = useState(false);
  const [notifier, setNotifier] = useState(false);

  const [likes, setLikes] = useState({ init: true, count: props.likes.length });
  useEffect(() => {
    setFillH(userInfo ? props.likes.includes(userInfo.username) : false);
  }, [userInfo]);
  useEffect(() => {
    if (!likes.init) {
      if (fillH) {
        setLikes((prev) => ({ ...prev, count: props.likes.length + 1 }));
      } else if (!fillH) {
        setLikes((prev) => ({
          ...prev,
          count: prev.count - 1,
        }));
      }
    }
    // console.log(likes);
  }, [fillH]);
  const fillHandler = () => {
    setFillH((prev) => {
      return !prev;
    });
    setLikes((prev) => ({ ...prev, init: false }));

    likeHandler();
  };

  const likeHandler = async () => {
    const data = await fetch(`/api1/posts/${props.postId}/like`, {
      method: "POST",
    });
  };
  const imageClickHandler = (image) => {
    props.modalClick();
    props.imageSrc(image);
  };
  const disableLoaderHandler = (e) => {
    if (e.naturalWidth === 0 && e.naturalHeight === 0) {
      return setLoader(0);
    }
    setLoader(false);
  };

  const imageErrorHandler = () => {
    setLoader(0);
  };
  const handlePopupClick = (e) => {
    setOpenPopup(e.currentTarget);
  };
  const open = Boolean(openPopup);
  const id = open ? "simple-popover" : undefined;
  const commentOpen = Boolean(openCommentPopup);
  const popupCloseHandler = () => {
    setOpenPopup(null);
  };
  const commentCloseHandler = () => {
    setOpenCommentPopup(null);
  };
  const deletePostHandler = async () => {
    const data = await fetch(`/api1/post/${props.postId}`, {
      method: "DELETE",
    });
    if (data.ok) {
      setOpenPopup(null);
      setPostHidden(true);
    }
  };
  const unfollowHandler = async () => {
    setOpenPopup(null);
    if (props.unfollowFilter) {
      props.unfollowFilter(props.username);
    }
    await fetch(`/api1/users/${props.userId}/follow`, {
      method: "POST",
    });
  };

  const commentPopup = (e) => {
    setOpenCommentPopup(e.currentTarget);
  };
  const closeHandler = () => {
    setNotifier(false);
  };
  const showNotiHandler = () => {
    setOpenCommentPopup(null);
    setNotifier(true);
    setTimeout(() => {
      setNotifier(false);
    }, 5000);
  };
  return (
    <div className={`${postHidden ? "hidden" : ""}`}>
      {notifier && (
        <SuccessNotifier
          closeHandler={closeHandler}
          message={"Comment succesfully sent"}
          comment
        />
      )}
      <div className="space-x-4 bg-white py-6 px-2 rounded-xl mx-10">
        <div className="flex items-center justify-between ">
          <div
            className="flex space-x-2  mb-4 ml-3 cursor-pointer"
            onClick={() => router.push(`/users/${props.username}`)}
          >
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
            onClick={handlePopupClick}
            className="cursor-pointer -mt-10"
          />
          <Popover
            id={id}
            open={open}
            anchorEl={openPopup}
            onClose={popupCloseHandler}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            {userInfo && props.username === userInfo.username ? (
              <Typography>
                <MdDeleteForever
                  size={35}
                  color="red"
                  className="flex p-2 cursor-pointer"
                  onClick={deletePostHandler}
                />
              </Typography>
            ) : (
              <Typography
                className="flex p-2 cursor-pointer hover:bg-slate-100"
                onClick={unfollowHandler}
              >
                <RiUserUnfollowLine size={25} color="red" />
                <span className="text-sm ml-1 text-red-500">Unfollow</span>
              </Typography>
            )}
          </Popover>
        </div>
        <div>
          {props.commentTo && (
            <p className="text-gray-400 -mt-3">
              replying to{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => router.push(`/users/${props.commentTo}`)}
              >
                @{props.commentTo}
              </span>
            </p>
          )}
          <div className=" cursor-crosshair">
            <Link href={`/post/${props.postId}`}>
              <div>
                <p>{props.text}</p>
              </div>
            </Link>
            <div
              className="grid  gap-4 grid-flow-col auto-rows-auto  mt-4 justify-center align-center"
              style={{ maxheight: "50px" }}
            >
              {props.images &&
                props.images.map((image, idx) => (
                  <div onClick={imageClickHandler.bind(null, image)} key={idx}>
                    <div>
                      {loader === true && <CircularProgress />}
                      <div
                        className={`${loader || loader === 0 ? "w-0 h-0" : ""}`}
                      >
                        <Image
                          src={image}
                          key={idx}
                          width="400"
                          height="350"
                          objectFit="cover"
                          className="overflow-hidden rounded-xl cursor-pointer max-h-96"
                          onLoadingComplete={(e) => disableLoaderHandler(e)}
                          onError={imageErrorHandler}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <hr className="mt-6" />
          <div className="flex  mt-6 space-x-6 w-full   justify-evenly  ">
            <div
              className="flex space-x-2 cursor-pointer flex-wrap overflow-hidden "
              style={{ maxHeight: "30px" }}
              onClick={commentPopup}
            >
              <BiComment
                size={20}
                className="cursor-pointer hover:text-blue-600 text-gray-500 mt-1"
              />
              <span className="text-gray-500">{props.commentCount} </span>
              <p className="text-md text-gray-500">
                <span className="hidden sm:inline"> Comments</span>
              </p>
            </div>
            <Popover
              id={id}
              open={commentOpen}
              anchorEl={openCommentPopup}
              onClose={commentCloseHandler}
              className="overflow-y-auto "
              anchorOrigin={{ vertical: 30, horizontal: -40 }}
            >
              <Comment postId={props.postId} onPost={showNotiHandler} />
            </Popover>
            <div
              className="flex space-x-2 cursor-pointer flex-wrap overflow-hidden"
              style={{ maxHeight: "30px" }}
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
              <span className="text-gray-500 ">{likes.count}</span>
              <p className="text-md text-gray-500 ">
                <span className="hidden sm:inline">Likes</span>
              </p>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <IoShareSocialOutline
                size={25}
                className="cursor-pointer text-gray-500"
              />
              <p className="text-md text-gray-500 hidden sm:inline">Shares</p>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <BsBookmark size={25} className="cursor-pointer text-gray-500" />
              <p className="text-md text-gray-500 hidden sm:inline">Save</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
