"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Image
            alt="Chat app logo"
            src="/logo_chat.png"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span className="text-xl font-semibold tracking-wide">ChatShant</span>
        </div>

        <div className="flex items-center space-x-8 text-gray-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/aboutus" className="hover:text-white transition">
            About us
          </Link>
          <Link href="/contactus" className="hover:text-white transition">
            Contact us
          </Link>

          {/* Auth Section */}
          {!session ? (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/chatpage" })}
              className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
