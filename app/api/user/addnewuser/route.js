import { connectDB } from "@/lib/db";
import { User } from "@/model/allusers";
export async function PATCH(req) {
  await connectDB();
  const { mail, name, Image } = await req.json();
  await User.updateOne(
    { mail },
    {
      $set: {
        name,
        Image,
      },
      $setOnInsert: {
        mail,
      },
    },
    { upsert: true },
  );
  return new Response("user added successfully");
}
