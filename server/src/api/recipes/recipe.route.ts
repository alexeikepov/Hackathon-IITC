import { Router } from "express";
import { recipeController } from "./recipe.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { reviewValidationSchema } from "../reviews/review.schema.js";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";
import { recipeValidationSchemas } from "./recipe.schema.js";

const router = Router();

router.get("/", recipeController.getAllRecipes);
router.get(
  "/:id/reviews",
  validate(globalValidationSchemas.getByIdSchema),
  recipeController.getAllReviews
);
router.get(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  recipeController.getRecipeById
);

// Protected
router.use(authMiddleware.authenticate);
router.post(
  "/:id/reviews",
  validate(reviewValidationSchema.createReviewSchema),
  recipeController.createReview
);
router.post(
  "/",
  validate(recipeValidationSchemas.createRecipeSchema),
  recipeController.createRecipe
);
router.put(
  "/:id",
  validate(recipeValidationSchemas.updateRecipeSchema),
  recipeController.updateRecipe
);
router.patch(
  "/:id",
  validate(recipeValidationSchemas.patchRecipeSchema),
  recipeController.patchRecipe
);
router.delete(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  recipeController.deleteRecipe
);

export default router;
