import React, { useState, useRef } from "react";
import { updateUserData, updateProfilePic } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { IoCloseSharp } from "react-icons/io5";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

import Image from "next/image";
const EditProfile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ACRef = useRef();
  const keywordRef = useRef();
  const socialRef = useRef();
  const [keywordErr, setKeywordErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(props.userData.name);
  const [email, setEmail] = useState(props.userData.email);
  const [username, setUsername] = useState(props.userData.username);
  const [bio, setBio] = useState(props.userData.bio);
  const [AcList, setACList] = useState(props.userData.accomplishments);
  const [socials, setSocials] = useState(props.userData.socials);
  const [socialForm, setSocialForm] = useState({});
  const [avatar, setAvatar] = useState(
    `data:image/png;base64,${props.userData.avatar}`
  );
  const [keywords, setKeywords] = useState(props.userData.keywords);
  const removeHandler = (idx, id) => {
    if (id === 1) {
      setACList((prevList) => {
        const l1 = prevList.slice(0, idx);
        const l2 = prevList.slice(idx + 1, prevList.length + 1);
        const newList = [...l1, ...l2];
        return newList;
      });
    } else if (id === 2) {
      setKeywords((prevList) => {
        const l1 = prevList.slice(0, idx);
        const l2 = prevList.slice(idx + 1, prevList.length + 1);
        const newList = [...l1, ...l2];
        return newList;
      });
    } else if (id === 3) {
      setSocials((prevList) => {
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
        socials,
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
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };
  const socialFormHandler = (e) => {
    if (e.target.value === "twitter" || e.target.value === "instagram") {
      setSocialForm({
        content: (
          <div className="flex">
            @<input ref={socialRef} type="text"></input>
          </div>
        ),
        type: e.target.value,
      });
    } else if (e.target.value === "youtube") {
      setSocialForm({
        content: (
          <div className="flex">
            Channel URL:{" "}
            <input ref={socialRef} className=" w-3/5" type="text"></input>
          </div>
        ),
        type: e.target.value,
      });
    }
  };
  const socialSubmitHandler = (e) => {
    e.preventDefault();
    const value = socialRef.current.value.trim();
    if (!value) {
      return setSocialForm({});
    }
    for (const item of socials) {
      if (socialForm.type === Object.keys(item)[0]) {
        return setSocialForm((prev) => {
          return {
            ...prev,
            error: "Only one social link per platform allowed",
          };
        });
      }
    }
    if (value) {
      if (socialForm.type === "twitter") {
        setSocials((prev) => [...prev, { twitter: value }]);
      } else if (socialForm.type === "instagram") {
        setSocials((prev) => [...prev, { instagram: value }]);
      } else if (socialForm.type === "youtube") {
        if (value.includes("https://www.youtube.com/")) {
          setSocials((prev) => [...prev, { youtube: value }]);
        } else {
          return setSocialForm((prev) => {
            return {
              ...prev,
              error: "Youtube link must contain the entire URL",
            };
          });
        }
      }
      socialRef.current.value = "";
    }
    setSocialForm({ type: "one" });
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
          <IoCloseSharp size={35} />
        </button>
        <h1 className="text-2xl font-thin mt-7 text-center">Edit profile</h1>
        <div className="flex justify-center mt-10">
          <div className="relative w-40 h-40 z-0 ">
            <Image src={avatar} className="rounded-full" layout="fill" />
          </div>
        </div>
        <form className=" ml-20 mt-5 flex flex-col w-full space-y-2">
          <label className="">Profile picture</label>
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
        <div className="mt-10">
          <h1 className="text-2xl font-thin text-center">Social Links</h1>
          <form
            className="ml-20 flex flex-col w-full"
            onSubmit={socialSubmitHandler}
          >
            <label htmlFor="socials" className="mt-4">
              Choose a social plateform:
            </label>
            <select
              name="socials"
              id="socials"
              className="w-2/3 ml-10 h-8"
              onChange={socialFormHandler}
              value={socialForm.type}
            >
              <option value="one">Select option</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">Youtube</option>
            </select>

            <ul className="mt-10">
              {socials.map((item, idx) => (
                <li
                  key={idx}
                  className="flex space-x-10 space-y-4 cursor-pointer"
                  onClick={removeHandler.bind(null, idx, 3)}
                >
                  <div className="flex mr-4 mt-1">
                    {Object.keys(item)[0] === "twitter" && <AiOutlineTwitter />}{" "}
                    {Object.keys(item)[0] === "youtube" && <AiFillYoutube />}{" "}
                    {Object.keys(item)[0] === "instagram" && (
                      <AiFillInstagram />
                    )}{" "}
                  </div>

                  {item[Object.keys(item)[0]]}
                </li>
              ))}
            </ul>
            {socialForm.content}
            {socialForm.error && (
              <p className=" text-red-500 mt-3">{socialForm.error}</p>
            )}
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
