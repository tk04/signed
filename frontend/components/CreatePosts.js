import React, { useRef, useCallback, useState } from "react";

const CreatePosts = React.memo(() => {
  const postRef = useRef();
  const [files, setFiles] = useState([]);
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

  // const getPosts = useCallback(async () => {
  //   const res = await fetch("/api1/posts/tk");
  //   const data = await res.json();
  //   console.log(data);
  // }, []);
  // getPosts();

  const fileHandler = (e) => {
    if (e.target.files) {
      for (const file of e.target.files) setFiles((prev) => prev.concat(file));
    }
  };

  console.log(files);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Post:</label>
        <input type="text" ref={postRef} />
        <input type="file" onChange={fileHandler} accept="image/*" multiple />
        {/* <img src="http://localhost:4000/images/posts/images-1642203018932.png" /> */}
      </form>
    </div>
  );
});

export default CreatePosts;
