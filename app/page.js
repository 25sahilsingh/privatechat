"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/chatpage");
    }
  }, [status, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar></Navbar>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-28 px-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
          Chat Without Limits.
        </h1>

        <p className="mt-4 text-gray-300 max-w-xl text-lg">
          A simple, privacy-focused chat platform where you connect instantly
          using just your email. No phone numbers. No personal details. Just
          chat.
        </p>

        {!session && (
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/chatpage" })}
            className="mt-8 px-10 py-3 text-lg font-semibold rounded-xl bg-indigo-500 hover:bg-indigo-600 transition shadow-xl shadow-indigo-500/30"
          >
            Get Started – It's Free
          </button>
        )}

        {session && (
          <button
            onClick={() => router.push("/chatpage")}
            className="mt-8 px-10 py-3 text-lg font-semibold rounded-xl bg-green-500 hover:bg-green-600 transition shadow-xl shadow-green-500/30"
          >
            Go to Chat
          </button>
        )}
      </section>
      <section className="grid md:grid-cols-3 gap-8 mt-24 px-10 md:px-20 pb-20">
        <FeatureCard
          title="Email Only"
          text="No phone number required. Your email is your identity—simple & secure."
        />
        <FeatureCard
          title="Private & Secure"
          text="We don’t store unnecessary info."
        />
        <FeatureCard
          title="Fast & Minimal"
          text="A clean, distraction-free chat experience designed for speed."
        />
      </section>
    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}
