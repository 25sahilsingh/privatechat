import { connectDB } from "@/lib/db";
import { User } from "@/model/allusers";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const mail = new URL(request.url).searchParams.get("mail");
  const user = await User.findOne({ mail: mail });
  return NextResponse.json({ target_user_detail: user });
}
