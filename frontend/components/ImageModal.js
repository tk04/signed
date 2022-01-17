import React, { useState } from "react";
import { useRouter } from "next/router";
const ImageModal = (props) => {
  const router = useRouter();
  const [show, setShow] = useState(props.show);
  return (
    <>
      {show ? (
        <div className="z-50">
          <div
            className=" z-20 bg-gray-500/50 w-screen h-screen fixed"
            onClick={() => {
              setShow(false);
              props.removeHandler();
            }}
          ></div>
          <div
            className="z-30 fixed flex flex-col  left-1/2 items-center mt-10 "
            style={{ transform: "translate(-50%, 0)" }}
          >
            <div style={{ height: "50vw", width: "35vw" }}>
              <img src={props.src} className="" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ImageModal;
