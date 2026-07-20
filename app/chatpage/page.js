"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Popup_sidemenu from "../components/chatpage_component/Popup_sidemenu";
import Left_sidecontact from "../components/chatpage_component/Left_sidecontact";
import { ChevronLeft } from "lucide-react";
let socket;

export default function ChatPage() {
  const { data: session } = useSession();
  const lastmessagescroll = useRef(null);
  const [mail, setmail] = useState("");
  const [mailto, setmailto] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [prevconnecteduser, setprevconnecteduser] = useState([]);
  const [unreadcount, setunreadcount] = useState({});
  const [is_Visible_Profile, setis_Visible_Profile] = useState(false);
  const socketInitialized = useRef(false);
  const [m_Left_sidecontactvisible, setm_makeLeft_sidecontactvisible] =
    useState(true);
  // -------------------- SOCKET + INITIAL FETCH --------------------
  useEffect(() => {
    if (!session || socketInitialized.current) return;
    socketInitialized.current = true;
    socket = io({
      query: { loggeduser: session.user.email },
    });
    socket.on("onlineuser", ({ onlineUsers }) => {
      setonlineUsers(onlineUsers);
    });
    console.log("online users updated:", onlineUsers);
    const fetchPrev = async () => {
      const {
        data: { fetchconnecteduser },
      } = await axios.get(`/api/connecteduser?mail=${session?.user.email}`);
      const { data } = await axios.post("/api/handlechat/allchat", {
        prevconnecteduser: fetchconnecteduser,
        currentuser: session?.user.email,
      });
      setunreadcount(data?.unreadcount);
      setprevconnecteduser(fetchconnecteduser);
    };
    fetchPrev();
    //add new user to db if not present
    const adduser = async () => {
      await axios.patch("/api/user/addnewuser", {
        mail: session.user.email,
        name: session.user.name,
        image: session.user.image,
      });
    };
    adduser();

    return () => {
      socket.disconnect();
      socketInitialized.current = false;
    };
  }, [session]);

  // -------------------- FETCH CHAT + MESSAGE LISTENER --------------------
  useEffect(() => {
    if (!mailto || !session) return;
    const handler = ({ message, mailFrom, mailTo }) => {
      if (mailFrom === session.user.email || mailFrom === mailto) {
        setmessages((prev) => [
          ...prev,
          { message, mailfrom: mailFrom, mailto: mailTo },
        ]);
      }
    };

    socket.on("messagefrombackend", handler);

    const fetchChat = async () => {
      const users = {
        mailto,
        mailfrom: session?.user.email,
      };
      const chat = await axios.patch(
        `/api/handlechat?users=${JSON.stringify(users)}`,
      );
      setmessages(chat.data);
    };
    fetchChat();

    return () => socket.off("messagefrombackend", handler);
  }, [mailto, session]);

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
    <div className="h-dvh flex bg-black text-gray-200">
      <Left_sidecontact
        prevconnecteduser={prevconnecteduser}
        setmail={setmail}
        mail={mail}
        handleaddperson={handleaddperson}
        session={session}
        onlineUsers={onlineUsers}
        unreadcount={unreadcount}
        setprevconnecteduser={setprevconnecteduser}
        setmailto={setmailto}
        mailto={mailto}
        is_Visible_Profile={is_Visible_Profile}
        setis_Visible_Profile={setis_Visible_Profile}
        m_Left_sidecontactvisible={m_Left_sidecontactvisible}
        setm_makeLeft_sidecontactvisible={setm_makeLeft_sidecontactvisible}
      />
      {/* MAIN CHAT AREA */}
      <main
        className={`${m_Left_sidecontactvisible == true ? "hidden" : "flex"} md:flex flex-1 flex-col`}
      >
        {/* Chat Header */}
        <div className="flex p-4 border-b border-gray-800 bg-[#0e0e0e] text-xl font-semibold justify-between items-center">
          <button
            className="md:hidden"
            onClick={() => setm_makeLeft_sidecontactvisible(true)}
          >
            <ChevronLeft size={24} />
          </button>
          {mailto ? `Chat with: ${mailto}` : "Select a contact"}
          <Popup_sidemenu
            changemailto={(mail) => {
              setmailto(mail);
            }}
            setprevconnecteduser={setprevconnecteduser}
            mailTo={mailto}
            currentuser={session?.user.email}
            is_Visible_Profile={is_Visible_Profile}
            setis_Visible_Profile={setis_Visible_Profile}
          />
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
