import { Router } from "express";
import recipeRouter from "./recipes/recipe.route.js";
import reviewRouter from "./reviews/review.route.js";
import userRouter from "./users/user.route.js";
import authRouter from "./auth/auth.route.js";

const router = Router();

router.use("/recipes", recipeRouter);
router.use("/reviews", reviewRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
