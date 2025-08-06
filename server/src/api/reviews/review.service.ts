import { ReviewModel } from "./review.model.js";
import { AppError } from "../../utils/appError.util.js";
import { CreateReviewInput, PatchReviewInput } from "./review.types.js";

const getAllReviews = () => {
  return ReviewModel.find()
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
};

const getReviewById = async (id: string) => {
  const review = await ReviewModel.findById(id)
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!review) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return review;
};

const createReview = async (
  userId: string,
  recipeId: string,
  reviewData: CreateReviewInput
) => {
  const savedReview = await ReviewModel.create({
    ...reviewData,
    recipe: recipeId,
    reviewer: userId,
  });
  return getReviewById(savedReview._id.toString());
};

const updateReview = async (id: string, reviewData: CreateReviewInput) => {
  const updatedReview = await ReviewModel.findByIdAndUpdate(id, reviewData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!updatedReview) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return updatedReview;
};

const patchReview = async (id: string, reviewData: PatchReviewInput) => {
  const updatedReview = await ReviewModel.findByIdAndUpdate(id, reviewData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!updatedReview) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return updatedReview;
};

const deleteReview = async (id: string) => {
  const deletedReview = await ReviewModel.findByIdAndDelete(id)
    .select("-__v")
    .populate({ path: "reviewer", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!deletedReview) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return deletedReview;
};

export const reviewService = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  patchReview,
  deleteReview,
};
