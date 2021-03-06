import React, { useState, useRef, useEffect, ReactElement } from "react";
import {
  updateUserData,
  updateProfilePic,
  getUserData,
} from "../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IoCloseSharp } from "react-icons/io5";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

import Image from "next/image";
const EditProfile = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ACRef = useRef<HTMLInputElement>();
  const keywordRef = useRef<HTMLInputElement>();
  const orgRef = useRef<HTMLInputElement>();
  const positionRef = useRef<HTMLInputElement>();
  const descRef = useRef<HTMLTextAreaElement>();
  const socialRef = useRef<HTMLInputElement>();
  const [keywordErr, setKeywordErr] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [name, setName] = useState<string>(props.userData.name);
  const [email, setEmail] = useState<string>(props.userData.email);
  const [username, setUsername] = useState<string>(props.userData.username);
  const [bio, setBio] = useState<string>(props.userData.bio);
  const [AcList, setACList] = useState<string[]>(
    props.userData.accomplishments
  );
  const [socials, setSocials] = useState(props.userData.socials);
  const [socialForm, setSocialForm] = useState<any>({});
  const [experience, setExperience] = useState<any>(props.userData.experiences);
  const [experienceForm, setExperienceForm] = useState<any>({});
  const [avatar, setAvatar] = useState<string>(
    `data:image/png;base64,${props.userData.avatar}`
  );

  const [keywords, setKeywords] = useState<string[]>(props.userData.keywords);
  const removeHandler = (idx: number, id: number) => {
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
    } else if (id === 4) {
      setExperience((prevList) => {
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
        experiences: experience,
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
      return setSocialForm(null);
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
    // setSocialForm({ type: "one" });
  };

  const showFormHandler = () => {
    if (!experienceForm.content) {
      const content = (
        <div className="flex flex-col w-2/3 mt-5 space-y-2">
          <input
            type="text"
            placeholder="Organization name"
            className="h-8"
            ref={orgRef}
          />
          <input
            type="text"
            placeholder="Position"
            className="h-8"
            ref={positionRef}
          />
          <textarea placeholder="description" className="h-16" ref={descRef} />
          <button className="bg-white p-2 ">Add Experience</button>
        </div>
      );
      setExperienceForm({ content });
    } else {
      setExperienceForm({});
    }
  };
  const experienceSubmitHandler = (e) => {
    e.preventDefault();
    const org_name = orgRef.current.value;
    const position = positionRef.current.value;
    const description = descRef.current.value;
    if (org_name.trim() && position.trim()) {
      setExperience((prev) => [...prev, { org_name, position, description }]);
      setExperienceForm({});
    } else {
      const error = (
        <p className="text-red-500">
          Must enter Organization name and Position
        </p>
      );
      setExperienceForm((prev) => {
        return { ...prev, error };
      });
    }
  };
  return (
    <div className="fixed flex flex-col z-10 justify-center items-center w-screen h-screen bg-slate-600/80 ">
      <div className="bg-gray-100 w-4/5 md:w-3/5 xl:w-1/3 h-2/3  overflow-y-scroll overflow-x-hidden rounded-lg ">
        <button
          className="relative mt-3 ml-3 text-right"
          onClick={() => {
            router.push(`/users/${props.userData.username}`);
          }}
        >
          <IoCloseSharp size={35} />
        </button>
        <div className="flex justify-center mt-2  ">
          <div className="relative w-40 h-40 z-0 ">
            {avatar && (
              <Image
                src={avatar}
                className="rounded-full"
                layout="fill"
                objectFit="cover"
                alt=""
              />
            )}
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
        <div className="mt-10">
          <h1 className="text-2xl font-thin text-center">Experience</h1>
          <div className="flex justify-center">
            <button
              className="mt-8 bg-slate-200 font-bold border-2 p-2  "
              onClick={showFormHandler}
            >
              Add experience
            </button>
          </div>
          <form
            className="ml-20 flex flex-col w-full"
            onSubmit={experienceSubmitHandler}
          >
            {experienceForm.content}
            {experienceForm.error}
            <ul className="mt-8 space-y-4 w-2/3">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer"
                  onClick={removeHandler.bind(null, idx, 4)}
                >
                  <h2 className=" font-bold">{item.org_name}</h2>
                  <p className=" text-gray-500">{item.position}</p>
                  <p className="mt-3 text-sm">{item.description}</p>
                </div>
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
