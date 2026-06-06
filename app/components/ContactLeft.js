import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
export default function ContactLeft({
  prevconnecteduser,
  setprevconnecteduser,
  onlineUsers,
  changemailto,
  mailto,
  unreadcount,
  currentuser,
  setis_Visible_Profile,
}) {
  const [openMenuUser, setOpenMenuUser] = useState(null);
  const menuconatainer = useRef(null);
  const [prevuserdetail, setprevuserdetail] = useState([]);
  useEffect(() => {
    const getuserdetail = async () => {
      const { data } = await axios.get(
        "/api/user/getuserdetail?mail=" + JSON.stringify(prevconnecteduser),
      );
      console.log("data", data.target_user_detail);
      setprevuserdetail(data.target_user_detail);
    };
    getuserdetail();
  }, [prevconnecteduser]);
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
      {prevuserdetail.map((user, index) => (
        <div
          key={index}
          onClick={() => changemailto(user.mail)}
          className={`p-3 flex items-center justify-between cursor-pointer border-b border-gray-800 hover:bg-gray-800/40 transition
          ${user.mail === mailto ? "bg-gray-800" : ""}`}
        >
          <div className="flex items-center space-x-2">
            <Image
              width={50}
              height={50}
              alt="profile_image"
              src={user.image || "/noprofileimage.webp"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>{user.name}</div>(
            <div className="text-sm text-gray-400">
              {user.mail.replace("@gmail.com", "")}
            </div>
            )
          </div>
          <div className="relative flex gap-4 items-center">
            <div
              className={`flex justify-center items-center h-6 w-6 rounded-full ${
                onlineUsers.includes(user.mail) ? "bg-green-400" : "bg-gray-600"
              }`}
            >
              {unreadcount[user.mail] !== 0 ? unreadcount[user.mail] : ""}
            </div>
            <div ref={openMenuUser === user.mail ? menuconatainer : null}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuUser((prev) =>
                    prev === user.mail ? null : user.mail,
                  );
                }}
                className="cursor-pointer px-2"
              >
                :
              </div>
              {openMenuUser === user.mail && (
                <div className=" absolute right-2 top-8 bg-gray-900 border rounded shadow-lg z-10 whitespace-nowrap">
                  <div
                    onClick={() => handledeletechat(user.mail)}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    Delete Chat
                  </div>
                  <div
                    onClick={() => {
                      setis_Visible_Profile((prev) => !prev);
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
