import { Types, HydratedDocument, Model } from "mongoose";
import z from "zod";
import { reviewValidationSchema } from "./review.schema.js";

export interface IReview {
  reviewer: Types.ObjectId;
  recipe: Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateReviewInput = z.infer<
  typeof reviewValidationSchema.createReviewBody
>;

export type UpdateReviewInput = z.infer<
  typeof reviewValidationSchema.createReviewBody
>;

export type PatchReviewInput = Partial<
  z.infer<typeof reviewValidationSchema.createReviewBody>
>;

// Mongo types/interfaces
export type ReviewDocument = HydratedDocument<IReview>;

export interface IReviewModel extends Model<ReviewDocument> {}
