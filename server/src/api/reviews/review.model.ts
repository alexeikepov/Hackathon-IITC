import { Schema, model } from "mongoose";
import { ReviewDocument, IReviewModel } from "./review.types.js";

const reviewSchema = new Schema<ReviewDocument, IReviewModel>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = model<ReviewDocument, IReviewModel>(
  "Review",
  reviewSchema
);
