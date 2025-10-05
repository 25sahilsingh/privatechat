"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
let socket;
export default function Home() {
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [mailfrom, setmailfrom] = useState("025.sahil@gmail.com");
  const [mailto, setmailto] = useState("25.sahilsingh@gmail.com");
  const [message, setmessage] = useState("");
  const temps = ["sahil", "singh", "is ", "great", "test1"];
  useEffect(() => {
    socket = io("http://localhost:5000", { query: `loggeduser=${mailfrom}` });
  }, [mailfrom]);
  useEffect(() => {
    socket.on("messagefrombackend", async (data) => {
      console.log("message recieved", data);
      // await axios.post("/api/handlechat/");
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const onsubmithandle = (e) => {
    e.preventDefault();
    socket.emit("messagefromclient", { message, mailfrom, mailto });
    setmessage("");
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="h-20 bg-amber-400 mx-4 mt-4 p-2">logged in as</div>
      <div className="flex flex-1 h-full">
        {/* side pannel */}
        <div className="w-1/5 bg-green-500 my-4 ml-4 p-2">a</div>
        <div className="flex flex-col w-4/5 m-4">
          <div className="flex flex-col-reverse flex-1 bg-pink-500 p-2">
            {temps.reverse().map((temp, index) => {
              return (
                <div key={index} className="flex w-full justify-end">
                  {temp}
                </div>
              );
            })}
          </div>
          <form className="w-full p-2 bg-red-500 mt-4">
            <input className="bg-fuchsia-500" placeholder="message"></input>
            <button className="bg-teal-600 " type="submit">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setmailfrom(from);
            setfrom("");
          }}
        >
          <input
            placeholder="enter from"
            value={from}
            onChange={(e) => {
              setfrom(e.target.value);
            }}
          ></input>
          <button type="submit">send</button>
          {mailfrom}
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setmailto(to);
            setto("");
          }}
        >
          <input
            placeholder="enter to"
            value={to}
            onChange={(e) => {
              setto(e.target.value);
            }}
          ></input>
          <button type="submit">send</button>
          {mailto}
        </form>
        <form onSubmit={onsubmithandle}>
          <input
            placeholder="enter message"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          ></input>
          <button type="submit">send</button>
        </form>
      </div> */
}
