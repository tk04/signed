import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SuccessNotifier = (props) => {
  return (
    <>
      <div className="flex justify-center flex-nowrap">
        <div
          className={`flex justify-center ${
            props.comment ? `space-x-4` : `space-x-10`
          } items-center fixed bg-sky-400 z-30 rounded-2xl text-white font-bold`}
          style={{
            bottom: "5vw",
            width: "16rem",
            // height: "40px",
          }}
        >
          <p className="text-center py-2 whitespace-nowrap ">{props.message}</p>
          <IoIosCloseCircleOutline
            size={20}
            className="cursor-pointer "
            onClick={props.closeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default SuccessNotifier;
