import React, { useRef, useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Image from "next/image";
const CreatePosts = React.memo(() => {
  const postRef = useRef();
  const [files, setFiles] = useState([]);
  const [filesErr, setFilesErr] = useState();
  const submitHandler = async (e) => {
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
      if (img.ok) {
        const imgRes = await img.json();
        console.log(imgRes);
      }
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

  // const getPosts = useCallback(async () => {
  //   const res = await fetch("/api1/posts/tk");
  //   const data = await res.json();
  //   console.log(data);
  // }, []);
  // getPosts();

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
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>New Post:</label>
        <br />
        <input
          type="text"
          className="border-2 border-black rounded-md"
          ref={postRef}
        />
        <br />
        <label htmlFor="icon-button-file">
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className="hidden"
            onChange={fileHandler}
            multiple
          />
          {files.length < 4 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled
            >
              <PhotoCamera />
            </IconButton>
          )}
        </label>
      </form>
      <div>
        {filesErr && filesErr}
        {files.map((img, idx) => (
          <Image
            src={URL.createObjectURL(img)}
            key={idx}
            width={100}
            height={100}
            onClick={removeImgHandler.bind(null, idx)}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
});

export default CreatePosts;
