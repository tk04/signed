import React, { useRef, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useSelector } from "react-redux";
import Image from "next/image";
const Comment = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const postRef = useRef();
  const [files, setFiles] = useState([]);
  const [avatar, setAvatar] = useState();
  const [filesErr, setFilesErr] = useState();
  const [height, setHeight] = useState(40);
  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo.avatar);
    }
  }, [userInfo]);

  // const adjustSize = () => {
  //   const textbox = document.getElementById("commentTextBox");
  //   textbox.style.height = 500;
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await fetch(`/api1/comment/${props.postId}`, {
      method: "POST",
      body: JSON.stringify({ text: postRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.ok) {
      const res = await data.json();
      const images = new FormData();
      for (const item of files) {
        images.append("images", item);
      }
      const img = await fetch(
        `http://localhost:3000/api1/posts/${res._id}/images`,
        {
          method: "POST",
          body: images,
          headers: images.getHeaders,
        }
      );
    }
  };

  const removeImgHandler = (idx) => {
    setFiles((prevList) => {
      const l1 = prevList.slice(0, idx);
      const l2 = prevList.slice(idx + 1, prevList.length + 1);
      const newList = [...l1, ...l2];
      return newList;
    });
  };

  const fileHandler = (e) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        setFiles((prev) => {
          if (prev && prev.length >= 4) {
            setFilesErr(
              <p className="text-red-400">
                A maximum of 4 images can be uploaded
              </p>
            );
            return prev;
          }
          return prev.concat(file);
        });
      }
    }
    e.target.value = null;
  };
  return (
    <div className="flex" style={{ width: "100%" }}>
      <div className="mt-4 ml-4 ">
        {userInfo && userInfo.avatar && (
          <Image
            src={`data:image/png;base64,${userInfo.avatar}`}
            width={52}
            height={52}
            className="rounded-full"
            layout="fixed"
          />
        )}
      </div>
      <form
        onSubmit={submitHandler}
        className="bg-white pt-4 pl-4 pr-4 rounded-2xl  "
      >
        <textarea
          className=" resize-none rounded-md pt-2 pl-2 leading-4 focus:outline-none text-lg "
          style={{ width: "21vw" }}
          id="commentTextBox"
          size={65}
          placeholder="New comment  ?"
          ref={postRef}
        />
        <br />
        {filesErr && filesErr}
        <div className="grid  gap-4 grid-flow-col auto-rows-auto  mt-4 justify-center align-center">
          {files &&
            files.map((image, idx) => (
              <div>
                <div>
                  <Image
                    src={URL.createObjectURL(image)}
                    key={idx}
                    width="200"
                    height="200"
                    objectFit="cover"
                    className="overflow-hidden rounded-xl cursor-pointer max-h-96"
                    onClick={removeImgHandler.bind(null, idx)}
                  />
                </div>
              </div>
            ))}
        </div>
        <hr className="mt-3" />
        <div className="flex justify-between mt-3 pb-3">
          <label htmlFor="icon-button-file">
            {files.length < 4 ? (
              <>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className="hidden"
                  onChange={fileHandler}
                  multiple
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </>
            ) : (
              <>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className="hidden"
                  onChange={fileHandler}
                  multiple
                  disabled
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  disabled
                >
                  <PhotoCamera />
                </IconButton>
              </>
            )}
          </label>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 border-black rounded-full self-end"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
