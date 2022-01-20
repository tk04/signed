import React, { useEffect, useState } from "react";
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
  console.log(relatedUsers);
  return (
    <div className="mt-20 z-0" style={{ width: "100%" }}>
      <h1 className="ml-3 mt-5 mb-5 text-xl">Suggested Users </h1>
      <ul>
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
              layout="fixed"
            />
            <section className="ml-2">
              <h1 className="font-bold">{user.name}</h1>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p className="overflow-hidden block text-ellipsis w-72 h-20 whitespace-nowrap">
                {user.bio}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSuggestions;
