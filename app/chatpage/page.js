"use client";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Image from "next/image";
import ContactLeft from "../components/ContactLeft";
let socket;

export default function ChatPage() {
  const { data: session } = useSession();
  const lastmessagescroll = useRef(null);
  const [mail, setmail] = useState("");
  const [mailto, setmailto] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [onlineUsers, setonlineUsers] = useState({});
  const [prevconnecteduser, setprevconnecteduser] = useState([]);
  // -------------------- SOCKET + INITIAL FETCH --------------------
  useEffect(() => {
    if (!session) return;

    socket = io("http://localhost:5000", {
      query: `loggeduser=${session?.user.email}`,
    });

    const fetchPrev = async () => {
      const {
        data: { fetchconnecteduser },
      } = await axios.get(`/api/connecteduser?mail=${session?.user.email}`);

      setprevconnecteduser(fetchconnecteduser);
    };
    fetchPrev();

    socket.on("onlineuser", ({ onlineusers }) => {
      setonlineUsers(onlineusers);
    });

    return () => socket.disconnect();
  }, [session]);

  // -------------------- FETCH CHAT + MESSAGE LISTENER --------------------
  useEffect(() => {
    if (!mailto && !session) return;
    socket.on("messagefrombackend", ({ message, mailFrom, mailTo }) => {
      if (mailFrom === session.user.email || mailFrom === mailto) {
        setmessages((prev) => [
          ...prev,
          { message, mailfrom: mailFrom, mailto: mailTo },
        ]);
      }
    });

    const fetchChat = async () => {
      const users = {
        mailto,
        mailfrom: session?.user.email,
      };
      const chat = await axios.patch(
        `/api/handlechat?users=${JSON.stringify(users)}`
      );
      setmessages(chat.data);
    };
    fetchChat();

    return () => socket.removeAllListeners("messagefrombackend");
  }, [mailto]);

  // --------------------SCROLL TO VIEW--------------------
  useEffect(() => {
    lastmessagescroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -------------------- SEND MESSAGE --------------------
  const onsendhandler = async (e) => {
    e.preventDefault();
    socket.emit("messagefromclient", {
      message,
      mailfrom: session?.user.email,
      mailto,
    });

    await axios.post("/api/handlechat/", {
      mailfrom: session?.user.email,
      mailto,
      message,
    });
    setmessage("");
  };

  // -------------------- ADD NEW CHAT PERSON --------------------
  const handleaddperson = async (e) => {
    e.preventDefault();
    await axios.patch("/api/connecteduser/", {
      newperson: mail,
      mailfrom: session.user.email,
    });
    setprevconnecteduser((prev) => [...prev, mail]);
    setmail("");
  };
  return (
    <div className="h-screen flex bg-black text-gray-200">
      {/* SIDEBAR */}
      <aside className="w-1/4 bg-[#111] border-r border-gray-800 flex flex-col">
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
            className="flex-1 bg-transparent border border-gray-700 p-2 rounded-md text-sm outline-none"
          />

          <button className="px-3 bg-blue-600 rounded-md text-sm">Add</button>
        </form>

        {/* Chat List */}
        <ContactLeft
          prevconnecteduser={prevconnecteduser}
          currentuser={session?.user.email}
          onlineUsers={onlineUsers}
          changemailto={(mail) => {
            setmailto(mail);
          }}
          mailto={mailto}
        />
      </aside>
      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 bg-[#0e0e0e] text-xl font-semibold">
          {mailto ? `Chat with: ${mailto}` : "Select a contact"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
          {messages.map((msg, index) => {
            const mine = msg.mailfrom === session?.user.email;
            return (
              <div
                key={index}
                className={`max-w-4/6 w-fit p-3 rounded-xl text-sm ${
                  mine
                    ? "ml-auto bg-blue-600 rounded-br-none"
                    : "mr-auto bg-gray-700 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            );
          })}
          <div ref={lastmessagescroll}></div>
        </div>

        {/* Message Input */}
        <form
          onSubmit={onsendhandler}
          className="p-4 border-t border-gray-800 bg-[#0d0d0d] flex gap-3"
        >
          <input
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-900 border border-gray-700 p-3 rounded-lg outline-none"
          />
          <button className="px-6 bg-blue-600 rounded-lg">Send</button>
        </form>
      </main>
    </div>
  );
}
