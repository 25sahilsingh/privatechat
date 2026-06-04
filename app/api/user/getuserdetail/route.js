import { connectDB } from "@/lib/db";
import { User } from "@/model/allusers";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const mail = JSON.parse(new URL(request.url).searchParams.get("mail"));
  console.log("mail", mail);
  const user = await User.find({ mail: { $in: mail } });
  return NextResponse.json({ target_user_detail: user });
}
