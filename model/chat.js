import mongoose, { Schema } from "mongoose";
const chatsSchema = new Schema({
  mailfrom: String,
  mailto: String,
  message: String,
});
export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatsSchema);
