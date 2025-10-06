"use client";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn(undefined, { callbackUrl: "/chatpage" })}>
        Sign in
      </button>
    </>
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
