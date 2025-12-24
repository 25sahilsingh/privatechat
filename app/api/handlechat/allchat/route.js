import { connectDB } from "@/lib/db";
import { Chat } from "@/model/chat";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { prevconnecteduser, currentuser } = await request.json();
  const all_chats = await Chat.find({
    seen: false,
    mailto: currentuser,
    mailfrom: { $in: prevconnecteduser },
  });
  console.log(all_chats);
  return NextResponse.json({ all_chats });
}
