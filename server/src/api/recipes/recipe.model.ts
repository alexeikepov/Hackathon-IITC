import { Schema, model } from "mongoose";
import { RecipeDocument, IRecipeModel } from "./recipe.types.js";

const recipeSchema = new Schema<RecipeDocument, IRecipeModel>(
  {
    imgSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["kosher", "vegan", "vegetarian", "meat-based", "gluten-free"],
    },
    preparationTime: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

recipeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "recipe",
});

export const RecipeModel = model<RecipeDocument, IRecipeModel>(
  "Recipe",
  recipeSchema
);
