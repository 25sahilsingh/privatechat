import mongoose, { Schema } from "mongoose";
const chatsSchema = new Schema({
  from: String,
  to: String,
  message: String,
});
export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatsSchema);
