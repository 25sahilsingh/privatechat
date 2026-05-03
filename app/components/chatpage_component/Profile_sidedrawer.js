const Profile_sidedrawer = ({ setrightprofile_menu }) => {
  return (
    <div>
      {/* Backdrop */}
      <div
        onClick={() => setrightprofile_menu(false)}
        className="fixed inset-0 bg-black/50 z-40"
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-overlay border-l border-overlay-line z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b border-overlay-header">
          <h3 className="font-semibold text-foreground">Profile</h3>

          <button
            onClick={() => setrightprofile_menu(false)}
            className="size-8 flex justify-center items-center rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-foreground">
            Here the person details will be shown like profile picture, name,
            email and other
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile_sidedrawer;
