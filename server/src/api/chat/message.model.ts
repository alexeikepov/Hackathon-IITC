// models/Message.ts
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  message: String,
  sentAt: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);