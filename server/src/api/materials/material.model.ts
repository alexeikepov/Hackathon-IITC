import mongoose, { Schema } from "mongoose";
import { IMaterial, IMaterialModel, MaterialDocument } from "./material.types.js";

const materialSchema = new Schema<MaterialDocument, IMaterialModel>(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "pdf", "github", "link"], required: true },
    url: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export const MaterialModel = mongoose.model<MaterialDocument, IMaterialModel>(
  "Material",
  materialSchema
);