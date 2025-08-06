import { Router } from "express";
import { courseController } from "./course.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";
import { courseValidationSchema } from "./course.schema.js";

const router = Router();

// Protected
router.use(authMiddleware.authenticate);
router.get("/", courseController.getAllCourses);
router.get(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  courseController.getCourseById
);


router.post(
  "/",
  validate(courseValidationSchema.createCourseSchema),
  courseController.createCourse
);
router.put(
  "/:id",
  validate(courseValidationSchema.updateCourseSchema),
  courseController.updateCourse
);
router.patch(
  "/:id",
  validate(courseValidationSchema.patchCourseSchema),
  courseController.patchCourse
);
router.delete(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  courseController.deleteCourse
);

export default router;
