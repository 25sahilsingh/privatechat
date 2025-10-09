import { connectDB } from "@/lib/db";
import { Chat } from "@/model/chat";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { mailfrom, mailto, message } = await request.json();
  const newchat = new Chat({ mailfrom, mailto, message });
  await newchat.save();
  return NextResponse.json({ message: "message added successfully" });
}
export async function GET(request) {
  const data = new URL(request.url).searchParams.get("users");
  const { mailfrom, mailto } = JSON.parse(data);
  if (mailfrom && mailto) {
    const chat = await Chat.find({
      mailfrom: { $in: [mailfrom, mailto] },
      mailto: { $in: [mailfrom, mailto] },
    });
    return NextResponse.json(chat);
  } else {
    return NextResponse.json([]);
  }
}
