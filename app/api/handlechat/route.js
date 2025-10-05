import { connectDB } from "@/lib/db";
import { Chat } from "@/model/chat";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { from, to, message } = await request.json();
  const newchat = new Chat({ from, to, message });
  await newchat.save();
  return NextResponse.json({ message: "message added successfully" });
}
