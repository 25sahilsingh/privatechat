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
  const unreadcount = {};
  prevconnecteduser.map((user) => {
    unreadcount[user] = 0;
  });
  all_chats.forEach((chat) => {
    if (unreadcount.hasOwnProperty(chat?.mailfrom)) {
      unreadcount[chat.mailfrom] = unreadcount[chat.mailfrom] + 1;
    }
  });
  return NextResponse.json({ unreadcount });
}
