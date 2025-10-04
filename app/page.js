import { useState } from "react";
import { io } from "socket.io-client";
export default function Home() {
  const [id, setid] = useState("");
  const [inputvalue, setinputvalue] = useState(second);
  const socket = io("http://localhost:3000");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setid(inputvalue);
          setinputvalue("");
        }}
      >
        <input
          type="text"
          value={inputvalue}
          placeholder="enter the connection string"
          onChange={(e) => {
            console.log(e);
            setinputvalue(e.value);
          }}
        ></input>
        <button type="submit">connect</button>
      </form>
    </div>
  );
}
