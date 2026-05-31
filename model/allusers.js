import mongoose, { Schema } from "mongoose";
const usersSchema = new Schema({
  mail: String,
  name: String,
  image: String,
});
export const User = mongoose.models.User || mongoose.model("User", usersSchema);
