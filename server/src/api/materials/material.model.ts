// models/Material.ts
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  type: { type: String, enum: ["video", "pdf", "github", "link"] },
  url: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Material", materialSchema);