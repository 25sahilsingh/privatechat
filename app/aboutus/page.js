import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">About Us</h1>

        <p className="text-lg leading-relaxed text-gray-300">
          Welcome to <span className="font-semibold text-white">ChatShant</span>{" "}
          — a simple, secure and elegant chat application designed to connect
          people using only their email. No phone numbers, no usernames, no
          complications.
        </p>

        <p className="text-lg leading-relaxed text-gray-300">
          Our mission is to create a smooth chatting experience that respects
          privacy while keeping the interface clean, fast, and clutter-free. We
          believe communication should feel natural, private, and effortless.
        </p>

        <p className="text-lg leading-relaxed text-gray-300">
          ChatShant is built using modern technologies like Next.js, Tailwind
          CSS, and secure authentication systems. We are constantly working on
          improving performance, adding new features and making the experience
          even better.
        </p>

        <p className="text-lg leading-relaxed text-gray-300">
          Thank you for choosing ChatShant — where simplicity meets smart
          communication.
        </p>
      </div>
    </div>
  );
}
