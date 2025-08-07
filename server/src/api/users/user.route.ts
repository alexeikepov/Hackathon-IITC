import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { userValidationSchema } from "./user.schema.js";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

const router = Router();
// Protected
router.use(authMiddleware.authenticate)

router.get("/", userController.getAllUsers);

router.get("/:id/courses",
  userController.getCoursesByUserId);

router.get(
  "/courses",
  userController.getAllCourses
);

router.get(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  userController.getUserById
);

router.put(
  "/",
  validate(userValidationSchema.updateUserSchema),
  userController.updateUser
);

router.patch(
  "/",
  validate(userValidationSchema.patchUserSchema),
  userController.patchUser
);

router.delete("/", authMiddleware.authenticate, userController.deleteUser);

export default router;
