import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "allchats",
    });
    console.log("connected to db....");
  } catch (error) {
    console.log(error);
  }
};
