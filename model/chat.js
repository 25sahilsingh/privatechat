import mongoose, { Schema } from "mongoose";
const chatsSchema = new Schema({
  mailfrom: String,
  mailto: String,
  message: String,
  seen: Boolean,
});
export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatsSchema);
