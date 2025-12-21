import Navbar from "../components/Navbar";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-black text-gray-200 ">
      <Navbar />
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <p className="text-lg text-gray-300 leading-relaxed">
          We’d love to hear from you! Whether you have questions, feedback, or
          need support, feel free to reach out.
        </p>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
          <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>

          <p className="text-gray-300">
            📧 <span className="font-medium">Email:</span> support@chatshant.com
          </p>

          <p className="text-gray-300">
            🕒 <span className="font-medium">Response Time:</span> Within 24
            hours
          </p>

          <p className="text-gray-300">
            💬 For quick help, you can also message us directly through the chat
            system.
          </p>
        </div>

        <p className="text-lg text-gray-400">
          Thank you for being part of ChatShant!
        </p>
      </div>
    </div>
  );
}
