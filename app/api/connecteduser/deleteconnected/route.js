import { connectDB } from "@/lib/db";
import { Userconnected } from "@/model/connecteduser";
import { NextResponse } from "next/server";
export async function PATCH(req) {
  await connectDB();
  const { user, currentuser } = await req.json();
  console.log("from api", user);
  await Userconnected.updateOne(
    { user: currentuser },
    { $pull: { connectedto: user } },
  );
  return NextResponse.json({ message: "person removed" });
}
