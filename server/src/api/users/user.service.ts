import { UserModel } from "./user.model.js";
import { AppError } from "../../utils/appError.util.js";
import {
  CreateUserInput,
  PatchUserInput,
  UpdateUserInput,
} from "./user.types.js";
import { RecipeModel } from "../recipes/recipe.model.js";
import { ReviewModel } from "../reviews/review.model.js";

const getAllUsers = () => {
  return UserModel.find()
    .populate({ path: "reviews", select: "-__v" })
    .populate({ path: "recipes", select: "-__v" })
    .select("-password -__v");
};

const getUserById = async (id: string) => {
  const user = await UserModel.findById(id)
    .select("-password -__v")
    .populate({ path: "recipes", select: "-__v" })
    .populate({ path: "reviews", select: "-__v" });
  if (!user) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials.", 400);
  }
  return user;
};

const createUser = async (userData: CreateUserInput) => {
  const emailExists = await UserModel.findOne({ email: userData.email });
  if (emailExists) {
    throw new AppError("Email already in use.", 409);
  }
  const savedUser = await UserModel.create(userData);
  return getUserById(savedUser._id.toString());
};

const updateUser = async (id: string, userData: UpdateUserInput) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    runValidators: true,
    new: true,
  })
    .select("-password -__v")
    .populate({ path: "recipes", select: "-__v" })
    .populate({ path: "reviews", select: "-__v" });
  if (!updatedUser) {
    throw new AppError("Invalid credentials.", 400);
  }
  return updatedUser;
};

const patchUser = async (id: string, userData: PatchUserInput) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    runValidators: true,
    new: true,
  })
    .select("-password -__v")
    .populate({ path: "recipes", select: "-__v" })
    .populate({ path: "reviews", select: "-__v" });
  if (!updatedUser) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return updatedUser;
};

const deleteUser = async (id: string) => {
  const deletedUser = await UserModel.findByIdAndDelete(id)
    .select("-password -__v")
    .populate({ path: "recipes", select: "-__v" })
    .populate({ path: "reviews", select: "-__v" });
  if (!deletedUser) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return deletedUser;
};

const getAllRecipes = (id: string) => {
  return RecipeModel.find({ creator: id })
    .select("-__v")
    .populate({ path: "reviews", select: "-__v" })
    .populate({ path: "creator", select: "-__v -password" });
};

const getAllReviews = (id: string) => {
  return ReviewModel.find({ reviewer: id })
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
};

export const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  getAllRecipes,
  getAllReviews,
};
