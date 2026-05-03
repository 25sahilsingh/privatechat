import axios from "axios";
import { useEffect, useRef, useState } from "react";
export default function ContactLeft({
  prevconnecteduser,
  setprevconnecteduser,
  onlineUsers,
  changemailto,
  mailto,
  unreadcount,
  currentuser,
  rightprofile_menu,
  setrightprofile_menu,
}) {
  const [openMenuUser, setOpenMenuUser] = useState(null);
  const menuconatainer = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuconatainer.current &&
        !menuconatainer.current.contains(event.target)
      ) {
        console.log("clicked outside");
        setOpenMenuUser(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handledeletechat = async (user) => {
    console.log("deleting chat with", currentuser, user);
    const deletechat = await axios.patch("/api/connecteduser/deleteconnected", {
      user,
      currentuser,
    });
    setprevconnecteduser((prev) => prev.filter((u) => u !== user));
    changemailto("");
    setOpenMenuUser(null);
  };
  return (
    <div className="flex-1 overflow-y-auto">
      {prevconnecteduser.map((user, index) => (
        <div
          key={index}
          onClick={() => changemailto(user)}
          className={`p-3 flex items-center justify-between cursor-pointer border-b border-gray-800 hover:bg-gray-800/40 transition
          ${user === mailto ? "bg-gray-800" : ""}`}
        >
          <div>{user}</div>
          <div className="relative flex gap-4 items-center">
            <div
              className={`flex justify-center items-center h-6 w-6 rounded-full ${
                onlineUsers.hasOwnProperty(user)
                  ? "bg-green-400"
                  : "bg-gray-600"
              }`}
            >
              {unreadcount[user] !== 0 ? unreadcount[user] : ""}
            </div>
            <div ref={openMenuUser === user ? menuconatainer : null}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuUser((prev) => (prev === user ? null : user));
                }}
                className="cursor-pointer px-2"
              >
                :
              </div>
              {openMenuUser === user && (
                <div className=" absolute right-2 top-8 bg-gray-900 border rounded shadow-lg z-10 whitespace-nowrap">
                  <div
                    onClick={() => handledeletechat(user)}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    Delete Chat
                  </div>
                  <div
                    onClick={() => {
                      setrightprofile_menu((prev) => !prev);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    Open Profile
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
