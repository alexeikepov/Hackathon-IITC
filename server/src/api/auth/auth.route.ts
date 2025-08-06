import { Router } from "express";
import { authMiddleware } from "./auth.middleware.js";
import { authController } from "./auth.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { userValidationSchema } from "../users/user.schema.js";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authMiddleware.authenticate, authController.logout);
router.post(
  "/register",
  validate(userValidationSchema.createUserSchema),
  authController.register
);
router.get("/me", authMiddleware.authenticate, authController.me);

export default router;
