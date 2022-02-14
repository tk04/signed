import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const UserSuggestions = () => {
  const router = useRouter();
  const [relatedUsers, setRelatedUsers] = useState([]);
  useEffect(() => {
    const getRelated = async () => {
      const data = await fetch("/api1/related/users");
      if (data.ok) {
        const res = await data.json();

        setRelatedUsers(res);
      }
    };
    getRelated();
  }, []);
  return (
    <div
      className="mt-20 z-0 mx-8 px-3 py-2 rounded-2xl "
      // style={{ width: "100%" }}
    >
      <h1 className="ml-3 mt-2 mb-5 text-xl font-bold">Who to follow </h1>
      <ul className=" space-y-10 px-6">
        {relatedUsers.map((user) => (
          <li
            key={user._id}
            className="flex m-3 mb-3 cursor-pointer"
            onClick={() => router.push(`/users/${user.username}`)}
          >
            <img
              src={`data:image/png;base64,${user.avatar}`}
              style={{ width: 52, height: 52 }}
              width={52}
              height={52}
              className="rounded-full "
            />
            <section className="ml-2">
              <h1 className="font-bold">{user.name}</h1>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p
                className="overflow-hidden  text-ellipsis h-12  whitespace-wrap"
                // style={{ width: "80%" }}
              >
                {user.bio}
              </p>
            </section>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default UserSuggestions;
