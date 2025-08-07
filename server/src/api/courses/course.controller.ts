import { courseService } from "./course.service.js";
import { Request, Response, NextFunction } from "express";
import {
  CreateCourseInput,
  ICourse,
  PatchCourseInput,
} from "./course.types.js";
import {
  AuthenticatedRequest,
  IdParams,
} from "../../utils/globalTypes.util.js";

// ✅ יצירת קורס – עם userId מה-Token
const createCourse = async (
  req: AuthenticatedRequest<{}, {}, CreateCourseInput>,
  res: Response<ICourse>,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" } as any);
    }
    console.log(req.body)
    const course = await courseService.createCourse(userId, req.body);
    return res.status(201).json(course);
  } catch (err) {
    return next(err);
  }
};

// ✅ שליפת כל הקורסים
const getAllCourses = async (
  _req: Request,
  res: Response<ICourse[]>,
  next: NextFunction
) => {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(courses);
  } catch (err) {
    return next(err);
  }
};

// ✅ שליפה לפי מזהה
const getCourseById = async (
  req: Request<IdParams>,
  res: Response<ICourse>,
  next: NextFunction
) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    return res.status(200).json(course);
  } catch (err) {
    return next(err);
  }
};

// ✅ עדכון מלא של קורס
const updateCourse = async (
  req: AuthenticatedRequest<IdParams, {}, CreateCourseInput>,
  res: Response<ICourse>,
  next: NextFunction
) => {
  try {
    const updatedCourse = await courseService.updateCourse(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedCourse);
  } catch (err) {
    return next(err);
  }
};

// ✅ עדכון חלקי (PATCH)
const patchCourse = async (
  req: AuthenticatedRequest<IdParams, {}, PatchCourseInput>,
  res: Response<ICourse>,
  next: NextFunction
) => {
  try {
    const updatedCourse = await courseService.patchCourse(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedCourse);
  } catch (err) {
    return next(err);
  }
};

// ✅ מחיקת קורס
const deleteCourse = async (
  req: AuthenticatedRequest<IdParams>,
  res: Response<ICourse>,
  next: NextFunction
) => {
  try {
    const deletedCourse = await courseService.deleteCourse(req.params.id);
    return res.status(200).json(deletedCourse);
  } catch (err) {
    return next(err);
  }
};

export const courseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  patchCourse,
  deleteCourse,
};