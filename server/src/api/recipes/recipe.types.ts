import { Types, HydratedDocument, Model } from "mongoose";
import { recipeValidationSchemas } from "./recipe.schema.js";
import z from "zod";

export interface IRecipe {
  imgSrc: string;
  title: string;
  ingredients: string[];
  instructions: string;
  description: string;
  creator: Types.ObjectId;
  category: "kosher" | "vegan" | "vegetarian" | "meat-based" | "gluten-free";
  preparationTime: 1 | 2 | 3 | 4;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateRecipeInput = z.infer<
  typeof recipeValidationSchemas.createRecipeBody
>;

export type UpdateRecipeInput = z.infer<
  typeof recipeValidationSchemas.createRecipeBody
>;

export type PatchRecipeInput = Partial<
  z.infer<typeof recipeValidationSchemas.createRecipeBody>
>;

// Mongo types/interfaces
export type RecipeDocument = HydratedDocument<IRecipe>;

export interface IRecipeModel extends Model<RecipeDocument> {}
