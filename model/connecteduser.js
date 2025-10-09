import mongoose, { Schema } from "mongoose";
const connectedSchema = new Schema({
  user: String,
  connectedto: Array,
});
export const Userconnected =
  mongoose.models.Userconnected ||
  mongoose.model("Userconnected", connectedSchema);
