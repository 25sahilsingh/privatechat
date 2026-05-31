import { connectDB } from "@/lib/db";
import { User } from "@/model/allusers";
export async function PATCH(req) {
  await connectDB();
  const { mail, name, image } = await req.json();
  await User.updateOne(
    { mail },
    {
      $set: {
        name,
        image,
      },
      $setOnInsert: {
        mail,
      },
    },
    { upsert: true },
  );
  return new Response("user added successfully");
}
