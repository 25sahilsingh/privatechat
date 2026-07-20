import React from "react";
import ContactLeft from "../ContactLeft";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Left_sidecontact({
  prevconnecteduser,
  setmail,
  mail,
  handleaddperson,
  session,
  onlineUsers,
  unreadcount,
  setprevconnecteduser,
  setmailto,
  mailto,
  is_Visible_Profile,
  setis_Visible_Profile,
  m_Left_sidecontactvisible,
  setm_makeLeft_sidecontactvisible,
}) {
  return (
    <div
      className={` ${m_Left_sidecontactvisible == true ? "flex" : "hidden"} w-full md:w-1/4 bg-[#111] border-r border-gray-800 flex-col md:flex`}
    >
      {/* User Profile */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-800">
        <Image
          width={50}
          height={50}
          alt="profile_image"
          src={session ? session.user.image : "/noprofileimage.webp"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold">{session?.user.name}</div>
          <div className="text-sm text-gray-400">{session?.user.email}</div>
        </div>
        <button
          className="text-sm px-3 py-1 bg-red-600 rounded-md"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>

      {/* Add new chat */}
      <form
        onSubmit={handleaddperson}
        className="p-3 flex gap-2 bg-[#0d0d0d] border-b border-gray-800"
      >
        <input
          placeholder="Enter email"
          value={mail}
          onChange={(e) => setmail(e.target.value)}
          className="flex-1 bg-transparent border border-gray-700 p-2 rounded-md text-sm "
        />

        <button className="px-3 bg-blue-600 rounded-md text-sm">Add</button>
      </form>

      {/* Chat List */}
      <ContactLeft
        setm_makeLeft_sidecontactvisible={setm_makeLeft_sidecontactvisible}
        prevconnecteduser={prevconnecteduser}
        currentuser={session?.user.email}
        onlineUsers={onlineUsers}
        unreadcount={unreadcount}
        setprevconnecteduser={setprevconnecteduser}
        changemailto={(mail) => {
          setmailto(mail);
        }}
        mailto={mailto}
        is_Visible_Profile={is_Visible_Profile}
        setis_Visible_Profile={setis_Visible_Profile}
      />
    </div>
  );
}

export default Left_sidecontact;
