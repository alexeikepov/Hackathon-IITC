import mongoose, { HydratedDocument, Model } from "mongoose";
import z from "zod";
import { materialValidationSchema } from "./material.schema.js";

export interface IMaterial {
  course: mongoose.Types.ObjectId;
  title: string;
  type: "video" | "pdf" | "github" | "link";
  url: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Zod input types
export type CreateMaterialInput = z.infer<typeof materialValidationSchema.createMaterialBody>;
export type UpdateMaterialInput = z.infer<typeof materialValidationSchema.updateMaterialSchema>;
export type PatchMaterialInput = Partial<CreateMaterialInput>;

// Mongo types/interfaces
export type MaterialDocument = HydratedDocument<IMaterial>;

export interface IMaterialModel extends Model<MaterialDocument> {}