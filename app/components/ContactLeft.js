"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ContactLeft({
  prevconnecteduser,
  onlineUsers,
  changemailto,
  mailto,
  currentuser,
}) {
  //count should be handle in backend
  const [user_allchat, setuser_allchat] = useState([]); // might not be neccessary in usestate can be normal variable
  const [unreadcount, setunreadcount] = useState({});
  useEffect(() => {
    const alluserchat = async () => {
      const { data } = await axios.post("/api/handlechat/allchat", {
        prevconnecteduser,
        currentuser,
      });
      setuser_allchat(data.all_chats);
      console.log(data.all_chats);
      const unreadcount = {};
      prevconnecteduser.map((user) => {
        unreadcount[user] = 0;
      });
      data.all_chats?.forEach((chat) => {
        console.log(0);
        if (unreadcount.hasOwnProperty(chat?.mailfrom)) {
          unreadcount[chat.mailfrom] = unreadcount[chat.mailfrom] + 1;
        }
      });
      setunreadcount(unreadcount);
    };
    alluserchat();
  }, [prevconnecteduser]);

  return (
    <div className="flex-1 overflow-y-auto ">
      {prevconnecteduser.map((user, index) => (
        <div
          key={index}
          onClick={() => changemailto(user)}
          className={`p-3 flex items-center justify-between cursor-pointer border-b border-gray-800 hover:bg-gray-800/40 transition
                        ${user === mailto ? "bg-gray-800" : ""}`}
        >
          <div>{user}</div>
          <div
            className={`flex justify-center align-middle h-6 w-6 rounded-full ${
              onlineUsers.hasOwnProperty(user) ? "bg-green-400" : "bg-gray-600"
            }`}
          >
            {unreadcount[user] != 0 ? unreadcount[user] : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
