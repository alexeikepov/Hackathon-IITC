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

const getAllCourses
 = async (
  _req: Request,
  res: Response<ICourse[]>,
  next: NextFunction
) => {
  try {
    const courses = await courseService.getAllCourses
    ();
    return res.status(200).json(courses);
  } catch (err) {
    return next(err);
  }
};

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
  getAllCourses,
  getCourseById,
  updateCourse,
  patchCourse,
  deleteCourse,
};
