import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import ImageModal from "../../components/ImageModal";
import SideNav from "../../components/SideNav";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

const post = () => {
  const router = useRouter();
  const pid = router.query.pid;
  const [post, setPost] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [skip, setSkip] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [postLoader, setPostLoader] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      setPostLoader(true);
      const data = await fetch(`/api1/post/${pid}?skip=${skip}`);
      if (data.ok) {
        const res = await data.json();
        setPost(res);
      }
      setPostLoader(false);
    };
    if (pid) {
      getPost();
    }
  }, [router.query.pid, skip]);
  console.log(post);
  const scrollHandler = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setSkip((prev) => prev + 3);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  return (
    <>
      {modalShow && (
        <ImageModal
          show={modalShow}
          src={imageSrc}
          removeHandler={() => setModalShow(false)}
        />
      )}
      <div
        className="relative w-screen h-screen overflow-y-auto "
        onScroll={scrollHandler}
      >
        <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_50%_25%] box-border">
          <div className="hidden lg:block">
            <SideNav />
          </div>
          <div className="flex flex-col  ">
            <Link href="/home?newpost=true" as="/home">
              Create post
            </Link>
            <br />
            <br />
            {post && (
              <>
                <Post
                  username={post.owner.username}
                  likes={post.likes}
                  name={post.owner.name}
                  text={post.text}
                  images={post.images}
                  avatar={`data:image/png;base64,${post.owner.avatar}`}
                  postId={post._id}
                  modalClick={() => setModalShow(true)}
                  imageSrc={(image) => setImageSrc(image)}
                  userId={post.owner._id}
                />

                <h1>Comments:</h1>
                <div
                  className="flex flex-col justify-center items-center rounded-lg "
                  style={{ width: "100%", backgroundColor: "#fafafa" }}
                >
                  <div style={{ width: "40vw" }}>
                    {post.comments.map((comment) => (
                      <Post
                        username={comment.owner.username}
                        key={comment._id}
                        likes={comment.likes}
                        name={comment.owner.name}
                        text={comment.text}
                        images={comment.images}
                        avatar={`data:image/png;base64,${comment.owner.avatar}`}
                        postId={comment._id}
                        modalClick={() => setModalShow(true)}
                        imageSrc={(image) => setImageSrc(image)}
                        userId={comment.owner._id}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            {postLoader === true && (
              <div className="h-40 flex justify-center">
                <CircularProgress />
              </div>
            )}
          </div>
          <div>
            <p>last col</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default post;
