import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import ImageModal from "../components/ImageModal";
import SideNav from "../components/SideNav";
import Link from "next/link";
const popular = () => {
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch(`/api1/popular?skip=${skip}`);
      if (data.ok) {
        const res = await data.json();
        setPosts((prev) => prev.concat(res));
      }
    };
    getPosts();
    console.log(skip);
  }, [skip]);
  console.log(posts);
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
            {posts && (
              <>
                {posts &&
                  posts.map((post, idx) => (
                    <Post
                      username={post.owner.username}
                      likes={post.likes}
                      name={post.owner.name}
                      key={post._id}
                      text={post.text}
                      images={post.images}
                      avatar={`data:image/png;base64,${post.owner.avatar}`}
                      postId={post._id}
                      modalClick={() => setModalShow(true)}
                      imageSrc={(image) => setImageSrc(image)}
                      userId={post.owner._id}
                      commentCount={post.comments.length}
                      commentTo={
                        post.commentTo ? post.commentTo.owner.username : null
                      }
                      // unfollowFilter={unfollowFilter}
                    />
                  ))}
              </>
            )}
            {/* {postLoader === true && (
              <div className="h-40 flex justify-center">
                <CircularProgress />
              </div>
            )} */}
          </div>
          <div>
            <p>last col</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default popular;
