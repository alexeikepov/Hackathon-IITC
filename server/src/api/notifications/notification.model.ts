// models/Notification.ts
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  message: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  isRead: { type: Boolean, default: false },
  sendTime: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);