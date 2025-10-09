"use client";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
let socket;
export default function chatpage() {
  const { data: session } = useSession();
  const [mail, setmail] = useState("");
  const [mailto, setmailto] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([
    { message: "test1" },
    { message: "test2" },
    { message: "test3" },
    { message: "test4" },
    { message: "test5" },
  ]);
  const [prevconnecteduser, setprevconnecteduser] = useState([]);
  useEffect(() => {
    const fetchprevconnecteduser = async () => {
      const {
        data: { fetchconnecteduser },
      } = await axios.get(`/api/connecteduser?mail=${session?.user.email}`);
      console.log(fetchconnecteduser);
      setprevconnecteduser(fetchconnecteduser);
      setmailto(fetchconnecteduser[0]);
    };
    fetchprevconnecteduser();
    socket = io("http://localhost:5000", {
      query: `loggeduser=${session?.user.email}`,
    });
    socket.on("messagefrombackend", async ({ message, mailfrom, mailto }) => {
      console.log("message recieved", message);
      setmessages((prev) => [...prev, { message, mailto, mailfrom }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [session]);
  useEffect(() => {
    const fetchchat = async () => {
      const users = {
        mailto,
        mailfrom: session?.user.email,
      };
      const chat = await axios.get(
        `/api/handlechat?users=${JSON.stringify(users)}`
      );
      console.log("here is chat", chat.data);
      setmessages(chat.data);
    };
    fetchchat();
  }, [mailto]);

  const handleaddperson = async (e) => {
    e.preventDefault();
    await axios.patch("/api/connecteduser/", {
      newperson: mail,
      mailfrom: session.user.email,
    });
    setmailto(mail);
    setmail("");
  };
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
  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-end h-25 bg-amber-400 mx-4 mt-4 p-2">
        <img src={session?.user.image} className="w-15 h-15 rounded-full"></img>
        <div>
          <div>Username:{session?.user.name}</div>
          <div>Email:{session?.user.email}</div>
          <button
            className="bg-red-500 rounded-2xl p-2"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            signout
          </button>
        </div>
      </div>
      <div className="flex flex-1 h-full">
        {/* side pannel */}
        <div className="w-1/5 bg-green-500 my-4 ml-4 p-2">
          <form onSubmit={handleaddperson}>
            <input
              placeholder="enter mail"
              value={mail}
              onChange={(e) => {
                setmail(e.target.value);
              }}
            ></input>
            <button type="submit">set</button>
          </form>
          <div>
            {prevconnecteduser.map((userconnect, index) => {
              return (
                <div
                  className={`${userconnect == mailto ? "bg-red-300" : ""}`}
                  onClick={() => {
                    setmailto(userconnect);
                  }}
                  key={index}
                >
                  {userconnect}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-4/5 m-4">
          <div className="flex flex-col-reverse flex-1 bg-pink-500 p-2 items-end">
            {[...messages].reverse().map((temp, index) => {
              return (
                <div
                  key={index}
                  className={`flex float-right w-fit m-1 p-2 rounded-tr-xl rounded-bl-xl ${
                    session?.user.email == temp.mailfrom
                      ? "self-end bg-indigo-500"
                      : "self-start bg-purple-500"
                  }`}
                >
                  {temp.message}
                </div>
              );
            })}
          </div>
          <form
            className="w-full h-1/18 flex  rounded-md overflow-hidden bg-red-500 mt-4"
            onSubmit={onsendhandler}
          >
            <input
              value={message}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
              className="bg-fuchsia-500 h-full flex-1 mr-2"
              placeholder="message"
            ></input>
            <button className="bg-teal-600 h-full w-1/12" type="submit">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
