// models/Presence.ts
import mongoose from "mongoose";

const presenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  classDate: Date,
  arrivedAt: Date,
  userLocation: {
    lat: Number,
    lng: Number
  },
  isInsideClass: Boolean
}, { timestamps: true });

export default mongoose.model("Presence", presenceSchema);