"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
const Profile_sidedrawer = ({ mailTo, setis_Visible_Profile }) => {
  const [target_user_detail, setTarget_User_Detail] = useState(null);
  useEffect(() => {
    if (!mailTo) return;
    console.log("mailTo", mailTo);
    const Get_Target_User_Detail = async () => {
      const { data } = await axios.get(
        "/api/user/getuserdetail?mail=" + JSON.stringify([mailTo]),
      );
      setTarget_User_Detail(data?.target_user_detail[0]);
    };
    Get_Target_User_Detail();
  }, [mailTo]);
  console.log("target user detail", target_user_detail);
  return (
    <div>
      {/* Backdrop */}
      <div
        onClick={() => setis_Visible_Profile(false)}
        className="fixed inset-0 bg-black/50 z-40"
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-auto bg-overlay border-l border-overlay-line z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b border-overlay-header">
          <h3 className="font-semibold text-foreground">Profile</h3>

          <button
            onClick={() => setis_Visible_Profile(false)}
            className="size-8 flex justify-center items-center rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-foreground">
            {target_user_detail ? (
              <>
                <Image
                  width={50}
                  height={50}
                  alt="profile_image"
                  src={target_user_detail.image || "/noprofileimage.webp"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <strong>Name:</strong> {target_user_detail.name}
                <br />
                <strong>Email:</strong> {target_user_detail.mail}
              </>
            ) : (
              "Loading..."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile_sidedrawer;
