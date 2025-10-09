import { connectDB } from "@/lib/db";
import { Userconnected } from "@/model/connecteduser";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const mail = new URL(request.url).searchParams.get("mail");
  const fetchuser = await Userconnected.findOne({ user: mail });
  return NextResponse.json({
    fetchconnecteduser: fetchuser?.connectedto || [],
  });
}
export async function PATCH(req) {
  await connectDB();
  const { newperson, mailfrom } = await req.json();
  console.log("from api", newperson);
  await Userconnected.updateOne(
    { user: mailfrom },
    { $push: { connectedto: newperson } },
    { upsert: true }
  );
  return NextResponse.json({ message: "person added" });
}
