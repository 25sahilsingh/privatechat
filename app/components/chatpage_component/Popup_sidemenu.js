import { useState } from "react";
import Profile_sidedrawer from "./Profile_sidedrawer";
import axios from "axios";
function Popup_sidemenu({
  mailTo,
  currentuser,
  setprevconnecteduser,
  changemailto,
  rightprofile_menu,
  setrightprofile_menu,
}) {
  const [menuopen, setMenuopen] = useState(false);

  const handledeletechat = async () => {
    const deletechat = await axios.patch("/api/connecteduser/deleteconnected", {
      user: mailTo,
      currentuser,
    });
    setprevconnecteduser((prev) => prev.filter((u) => u !== mailTo));
    changemailto("");
    setMenuopen(false);
  };
  return (
    <div className="flex justify-end relative">
      <button
        onClick={() => setMenuopen(!menuopen)}
        className="rounded-md bg-slate-800 py-2 px-4 text-xl text-white"
      >
        :
      </button>

      {menuopen && (
        <ul className="absolute right-0 top-full mt-2 z-10 rounded-md border bg-gray-700 shadow-lg w-max">
          <li
            onClick={() => {
              setrightprofile_menu((prev) => !prev);
              setMenuopen(false);
            }}
            className="p-2 hover:bg-gray-800 cursor-pointer text-white"
          >
            Open Profile
          </li>
          <li
            onClick={handledeletechat}
            className="p-2 hover:bg-gray-800 cursor-pointer text-white"
          >
            Delete Chats
          </li>
        </ul>
      )}
      {rightprofile_menu && (
        <Profile_sidedrawer setrightprofile_menu={setrightprofile_menu} />
      )}
    </div>
  );
}

export default Popup_sidemenu;
