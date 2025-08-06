import { reviewService } from "./review.service.js";
import { Request, Response, NextFunction } from "express";
import {
  CreateReviewInput,
  IReview,
  PatchReviewInput,
} from "./review.types.js";
import {
  AuthenticatedRequest,
  IdParams,
} from "../../utils/globalTypes.util.js";

const getAllReviews = async (
  _req: Request,
  res: Response<IReview[]>,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getAllReviews();
    return res.status(200).json(reviews);
  } catch (err) {
    return next(err);
  }
};

const getReviewById = async (
  req: Request<IdParams>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    return res.status(200).json(review);
  } catch (err) {
    return next(err);
  }
};

const updateReview = async (
  req: AuthenticatedRequest<IdParams, {}, CreateReviewInput>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedReview);
  } catch (err) {
    return next(err);
  }
};

const patchReview = async (
  req: AuthenticatedRequest<IdParams, {}, PatchReviewInput>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const updatedReview = await reviewService.patchReview(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedReview);
  } catch (err) {
    return next(err);
  }
};

const deleteReview = async (
  req: AuthenticatedRequest<IdParams>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const deletedReview = await reviewService.deleteReview(req.params.id);
    return res.status(200).json(deletedReview);
  } catch (err) {
    return next(err);
  }
};

export const reviewController = {
  getAllReviews,
  getReviewById,
  updateReview,
  patchReview,
  deleteReview,
};
