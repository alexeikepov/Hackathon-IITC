import { RecipeModel } from "./recipe.model.js";
import { AppError } from "../../utils/appError.util.js";
import { CreateRecipeInput, PatchRecipeInput } from "./recipe.types.js";
import { ReviewModel } from "../reviews/review.model.js";

const getAllRecipes = async () => {
  return RecipeModel.find()
    .select("-__v")
    .populate({ path: "creator", select: "-__v -password" });
};

const getRecipeById = async (id: string) => {
  const recipe = await RecipeModel.findById(id)
    .select("-__v")
    .populate({ path: "creator", select: "-__v -password" });
  if (!recipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return recipe;
};

const createRecipe = async (userId: string, recipeData: CreateRecipeInput) => {
  const savedRecipe = await RecipeModel.create({
    ...recipeData,
    creator: userId,
  });
  return getRecipeById(savedRecipe._id.toString());
};

const updateRecipe = async (id: string, recipeData: CreateRecipeInput) => {
  const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, recipeData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate({ path: "creator", select: "-__v -password" });
  if (!updatedRecipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return updatedRecipe;
};

const patchRecipe = async (id: string, recipeData: PatchRecipeInput) => {
  const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, recipeData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate({ path: "creator", select: "-__v -password" });
  if (!updatedRecipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return updatedRecipe;
};

const deleteRecipe = async (id: string) => {
  const deletedRecipe = await RecipeModel.findByIdAndDelete(id)
    .select("-__v")
    .populate({ path: "creator", select: "-__v -password" });
  if (!deletedRecipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return deletedRecipe;
};

const getAllReviews = (id: string) => {
  return ReviewModel.find({ recipe: id })
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
};

export const recipeService = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  getAllReviews,
};
