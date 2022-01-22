import React, { useRef, useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
const CreatePosts = (props) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.log(userAvatar);
  const postRef = useRef();
  const [files, setFiles] = useState([]);
  const [filesErr, setFilesErr] = useState();
  const submitHandler = async (e) => {
    props.onPost();
    router.push("/home");
    e.preventDefault();

    const data = await fetch("/api1/posts", {
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
      const img = await fetch(`api1/posts/${res._id}/images`, {
        method: "POST",
        body: images,
        headers: images.getHeaders,
      });
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
    <>
      <div
        className=" z-20 bg-gray-500/50 w-screen h-screen fixed"
        onClick={() => router.push("/home")}
      ></div>
      <div
        className="z-30 fixed flex flex-col  left-1/2 items-center mt-10 "
        style={{ transform: "translate(-50%, 0)" }}
      >
        <div
          className="flex bg-white rounded-2xl overflow-y-auto"
          style={{ maxHeight: "90vh" }}
        >
          <div className="mt-4 ml-4 ">
            {userInfo && userInfo.avatar && (
              <Image
                src={`data:image/png;base64,${userInfo.avatar}`}
                width={62}
                height={62}
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
              className=" resize-none rounded-md pt-2 pl-2 leading-4 focus:outline-none text-lg"
              style={{ width: "100%", minWidth: "35vw", height: "10vh" }}
              size={65}
              placeholder="New Post ?"
              ref={postRef}
            />
            <br />
            {filesErr && filesErr}
            <div className="grid g grid-flow-row-dense gap-4 grid-cols-2 grid-rows-1">
              {files.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={URL.createObjectURL(img)}
                    onClick={removeImgHandler.bind(null, idx)}
                    key={idx}
                    className="cursor-pointer rounded-xl"
                  />
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
      </div>
    </>
  );
};

export default CreatePosts;
