"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
let socket;
export default function chatpage() {
  const { data: session } = useSession();
  console.log(session);
  const [mail, setmail] = useState("");
  const [mailto, setmailto] = useState("25.sahilsingh@gmail.com");
  const [message, setmessage] = useState("");
  const [temps, settemps] = useState([]);
  useEffect(() => {
    socket = io("http://localhost:5000", {
      query: `loggeduser=${session?.user.email}`,
    });
    socket.on("messagefrombackend", async ({ message }) => {
      console.log("message recieved", message);
      settemps((prev) => [...prev, message]);
      // await axios.post("/api/handlechat/");
    });
    return () => {
      socket.disconnect();
    };
  }, [session]);
  useEffect(() => {}, []);
  const onsubmithandle = (e) => {
    e.preventDefault();
    socket.emit("messagefromclient", {
      message,
      mailfrom: session?.user.email,
      mailto,
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setmailto(mail);
            }}
          >
            <input
              placeholder="enter mail"
              value={mail}
              onChange={(e) => {
                setmail(e.target.value);
              }}
            ></input>
            <button type="submit">set</button>
          </form>
        </div>
        <div className="flex flex-col w-4/5 m-4">
          <div className="flex flex-col-reverse flex-1 bg-pink-500 p-2">
            {[...temps].reverse().map((temp, index) => {
              return (
                <div key={index} className="flex w-full justify-end">
                  {temp}
                </div>
              );
            })}
          </div>
          <form
            className="w-full p-2 bg-red-500 mt-4"
            onSubmit={onsubmithandle}
          >
            <input
              value={message}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
              className="bg-fuchsia-500"
              placeholder="message"
            ></input>
            <button className="bg-teal-600 " type="submit">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
