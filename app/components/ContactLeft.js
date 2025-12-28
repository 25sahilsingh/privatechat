export default function ContactLeft({
  prevconnecteduser,
  onlineUsers,
  changemailto,
  mailto,
  unreadcount,
}) {
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
