import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sessionwrapper from "./helper/Sessionwrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat-Shant",
  description: "New Generation MAIL powered chatapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sessionwrapper>{children}</Sessionwrapper>
      </body>
    </html>
  );
}
