import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import ImageModal from "./ImageModal";
import SideNav from "./SideNav";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { CgArrowLongUp } from "react-icons/cg";
import SearchBox from "./SearchBox";
import UserSuggestions from "./UserSuggestions";
import { useSelector } from "react-redux";
import { BsImage } from "react-icons/bs";
import Image from "next/image";
import { RootState } from "../store/store";
const PostPage = ({ pid }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const postRef = useRef<HTMLDivElement>();
  const [post, setPost] = useState<any>();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [postLoader, setPostLoader] = useState<boolean>(false);
  const [threadPosts, setThreadPosts] = useState<any>([]);
  const [threadPost, setThreadPost] = useState<any>();
  const [maxComments, setMaxComments] = useState<boolean>(false);
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
        <div className=" grid grid-cols-[100%]  m-0 p-0 lg:grid-cols-[25%_45%_30%] box-border">
          <div className="hidden lg:block">
            <SideNav />
          </div>
          <div className="flex flex-col" style={{}}>
            <div className=" mt-5">
              <h1 className="ml-20 mb-3 font-bold text-lg ">
                {post && post.owner.username
                  ? "Post by " + post.owner.username
                  : "Post Section"}
              </h1>
              <hr className="ml-10" style={{ width: "90%" }} />
              <Link href="/home?newpost=true" passHref as="/home">
                <div className="flex mt-6 space-x-2 cursor-pointer justify-center">
                  {userInfo && userInfo.avatar && (
                    <Image
                      src={`data:image/png;base64,${userInfo.avatar}`}
                      width={52}
                      height={52}
                      layout="fixed"
                      className="rounded-full"
                      alt=""
                    />
                  )}
                  <section className=" bg-slate-50 w-3/4 rounded-full ">
                    <div
                      className="flex justify-between"
                      style={{ width: "95%", paddingBottom: "10px" }}
                    >
                      <p className="ml-4 mt-3 text-gray-500">
                        {" "}
                        Whats on your mind?
                      </p>

                      <BsImage size={25} className="ml-4 mt-3 0 " />
                    </div>
                  </section>
                </div>
              </Link>
            </div>
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
                        <CgArrowLongUp size={45} />
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
                <div className="flex flex-col items-center">
                  <h1 className=" self-start ml-10 my-5 font-semibold">
                    Comments:
                  </h1>
                  <div
                    className="flex flex-col  items-center space-y-5 rounded-lg bg-gray-50/90"
                    style={{
                      width: "95%",
                      height: "100%",
                      // backgroundColor: "#fafafa",
                    }}
                  >
                    <div style={{ width: "100%" }} className="p-4">
                      {comments &&
                        comments.map((comment) => (
                          <div className="m-2 my-5" key={comment._id}>
                            <Post
                              username={comment.owner.username}
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
                          </div>
                        ))}
                    </div>
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
          <div className="hidden lg:block">
            <SearchBox />
            <UserSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
