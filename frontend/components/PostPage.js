import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import ImageModal from "./ImageModal";
import SideNav from "./SideNav";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { CgArrowLongUp } from "react-icons/cg";
const PostPage = ({ pid }) => {
  const postRef = useRef();
  const [post, setPost] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [skip, setSkip] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [postLoader, setPostLoader] = useState(false);
  const [threadPosts, setThreadPosts] = useState([]);
  const [threadPost, setThreadPost] = useState();
  const [maxComments, setMaxComments] = useState(false);
  const [comments, setComments] = useState([]);

  const getPost = async () => {
    setPostLoader(true);
    const data = await fetch(`/api1/post/${pid}`);
    if (data.ok) {
      const res = await data.json();

      // window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
      setComments([]);
      setThreadPost(null);
      setThreadPosts([]);
      setSkip(0);
      setPost(null);
      setMaxComments(false);
      setPost(res);
      if (res.commentTo) {
        setThreadPost(res.commentTo);
      }
    }
    setPostLoader(false);
  };
  const getComments = async () => {
    setPostLoader(true);
    const data = await fetch(`/api1/post/${pid}/comments?skip=${skip}`);
    if (data.ok) {
      const res = await data.json();
      if (res.length === 0) {
        setMaxComments(true);
      }
      setComments((prev) => prev.concat(res));
    }
    setPostLoader(false);
  };

  useEffect(() => {
    if (pid) {
      getPost();
    }
  }, [pid]);
  useEffect(() => {
    if (post) {
      getComments();
    }
  }, [post]);
  useEffect(() => {
    if (!maxComments) {
      if (post && skip !== 0) {
        getComments();
      }
    }
  }, [skip]);
  useEffect(() => {
    if (threadPost) {
      setThreadPosts((prev) => prev.concat(threadPost));
      if (threadPost.commentTo) {
        const getThread = async () => {
          const data = await fetch(`/api1/post/${threadPost.commentTo._id}`);
          if (data.ok) {
            const res = await data.json();
            setThreadPost(res);
          }
        };
        // console.log(threadPost);
        getThread();
      }
    }
  }, [threadPost]);

  const scrollHandler = (e) => {
    const target = e.target;
    if (!maxComments) {
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        setSkip((prev) => prev + 3);
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  };
  if (postRef.current) {
    postRef.current.scrollIntoView({ behavior: "smooth" });
  }
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
                {threadPosts && (
                  <>
                    {threadPosts.reverse().map((p) => (
                      <>
                        <Post
                          username={p.owner.username}
                          likes={p.likes}
                          key={p._id}
                          name={p.owner.name}
                          text={p.text}
                          images={p.images}
                          avatar={`data:image/png;base64,${p.owner.avatar}`}
                          postId={p._id}
                          modalClick={() => setModalShow(true)}
                          imageSrc={(image) => setImageSrc(image)}
                          userId={p.owner._id}
                          commentCount={p.comments.length}
                        />
                        <CgArrowLongUp size={150} />
                      </>
                    ))}
                  </>
                )}
                <div ref={postRef}>
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
                    commentCount={post.comments.length}
                  />
                </div>
                <h1>Comments:</h1>
                <div
                  className="flex flex-col  items-center rounded-lg "
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <div style={{ width: "40vw" }}>
                    {comments &&
                      comments.map((comment) => (
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
                          commentCount={comment.comments.length}
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

export default PostPage;
