import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";
import { reviewValidationSchema } from "./review.schema.js";

const router = Router();

router.get("/", reviewController.getAllReviews);
router.get(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  reviewController.getReviewById
);

// Protected
router.use(authMiddleware.authenticate);
router.put(
  "/:id",
  validate(reviewValidationSchema.updateReviewSchema),
  reviewController.updateReview
);
router.patch(
  "/:id",
  validate(reviewValidationSchema.patchReviewSchema),
  reviewController.patchReview
);
router.delete(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  reviewController.deleteReview
);

export default router;
