import React, { useState, useRef } from "react";
import { updateUserData, updateProfilePic } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
const EditProfile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ACRef = useRef();
  const keywordRef = useRef();
  const [keywordErr, setKeywordErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(props.userData.name);
  const [email, setEmail] = useState(props.userData.email);
  const [username, setUsername] = useState(props.userData.username);
  const [bio, setBio] = useState(props.userData.bio);
  const [AcList, setACList] = useState(props.userData.accomplishments);
  const [keywords, setKeywords] = useState(props.userData.keywords);
  const removeHandler = (idx, id) => {
    if (id === 1) {
      setACList((prevList) => {
        const l1 = prevList.slice(0, idx);
        const l2 = prevList.slice(idx + 1, prevList.length + 1);
        const newList = [...l1, ...l2];
        return newList;
      });
    } else {
      setKeywords((prevList) => {
        const l1 = prevList.slice(0, idx);
        const l2 = prevList.slice(idx + 1, prevList.length + 1);
        const newList = [...l1, ...l2];
        return newList;
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const current_val = ACRef.current.value;
    setACList((prev) => prev.concat(current_val));
    ACRef.current.value = "";
  };
  const keywordSubmitHandler = (e) => {
    e.preventDefault();

    const current_val = keywordRef.current.value;
    if (keywords.length === 3) {
      setKeywordErr(true);
    } else {
      setKeywords((prev) => prev.concat(current_val));
      setKeywordErr(false);
      keywordRef.current.value = "";
    }
  };

  const inputChangeHandler = (type, e) => {
    const value = e.target.value;
    if (type === "name") {
      setName(value);
    } else if (type === "username") {
      setUsername(value);
    } else if (type === "email") {
      setEmail(value);
    } else if (type === "bio") {
      setBio(value);
    }
  };

  const saveHandler = () => {
    dispatch(
      updateUserData({
        name,
        username,
        email,
        bio,
        keywords,
        accomplishments: AcList,
      })
    );
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      dispatch(updateProfilePic(formData));
    }

    router.push(`/users/${props.userData.username}`);
  };
  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="fixed flex flex-col z-10 justify-center items-center w-screen h-screen bg-slate-600/80 ">
      <div className="bg-slate-200 w-4/5 md:w-3/5 xl:w-1/3 h-2/3  overflow-y-scroll overflow-x-hidden rounded-lg ">
        <button
          className="relative mt-3 ml-3 text-right"
          onClick={() => {
            router.push(`/users/${props.userData.username}`);
          }}
        >
          X
        </button>
        <h1 className="text-2xl font-thin mt-7 text-center">Edit profile</h1>
        <form className="text-left ml-20 mt-10 flex flex-col w-full space-y-2">
          <label>Profile picture</label>
          <input type="file" onChange={fileHandler} />
          <label>Name:</label>
          <input
            value={name}
            onChange={inputChangeHandler.bind(this, "name")}
            type="text"
            className="ml-5 border-2 border-sky-100 w-2/3 h-8"
          />
          <label>Username:</label>
          <input
            type="text"
            onChange={inputChangeHandler.bind(null, "username")}
            value={username}
            className="ml-5 border-2 border-sky-100 w-2/3 h-8"
          />
          <label>Email:</label>
          <input
            type="email"
            onChange={inputChangeHandler.bind(null, "email")}
            value={email}
            className="ml-5 border-2 border-sky-100 w-2/3 h-8"
          />
          <label>Passowrd:</label>
          <input
            type="password"
            className="ml-5 border-2 border-sky-100 w-2/3 h-8"
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            className="ml-5 border-2 border-sky-100 w-2/3 h-8"
          />
          <label>Bio:</label>
          <textarea
            type="text"
            onChange={inputChangeHandler.bind(null, "bio")}
            value={bio}
            className="ml-5 border-2 border-sky-100 w-2/3"
          />
        </form>
        <div className="mt-10">
          <h1 className="text-2xl font-thin text-center">
            Experience / Accomplishments{" "}
          </h1>
          <form className="ml-20 flex flex-col w-full" onSubmit={submitHandler}>
            <label className="mt-4 mb-2">Enter Accomplishment: </label>
            <input
              type="text"
              className="ml-5 border-2 border-sky-100 w-2/3 h-8"
              ref={ACRef}
            />
            <ul className="ml-10 mt-5 space-y-3  list-disc">
              {AcList.map((item, idx) => (
                <li
                  onClick={removeHandler.bind(null, idx, 1)}
                  key={idx}
                  className="cursor-pointer	"
                >
                  {item}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl font-thin text-center">Keywords</h1>
          <form
            className="ml-20 flex flex-col w-full"
            onSubmit={keywordSubmitHandler}
          >
            <label className="mt-4 mb-2">
              Add keyword{" "}
              <span className={`${keywordErr ? "text-red-600" : "text-black"}`}>
                (3 max)
              </span>
              :
            </label>
            <input
              type="text"
              className="ml-5 border-2 border-sky-100 w-2/3 h-8"
              ref={keywordRef}
            />

            <ul className="ml-10 mt-5 space-y-3  list-disc">
              {keywords.map((item, idx) => (
                <li
                  onClick={removeHandler.bind(null, idx, 2)}
                  key={idx}
                  className="cursor-pointer	"
                >
                  {item}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <button
          className=" mt-14 bg-sky-400 w-full py-5 text-md font-extrabold  text-white"
          onClick={saveHandler}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
