import { CourseModel } from "./course.model.js";
import { AppError } from "../../utils/appError.util.js";
import { CreateCourseInput, PatchCourseInput } from "./course.types.js";

const getAllCourses = () => {
  return CourseModel.find()
    .select("-__v")
    .populate({ path: "course", select: "-__v -password" })
};

const getCourseById = async (id: string) => {
  const course = await CourseModel.findById(id)
    .select("-__v")
    .populate({ path: "course", select: "-__v -password" })
  if (!course) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }
  return course;
};

const createCourse = async (
  userId: string,
  recipeId: string,
  courseData: CreateCourseInput
) => {
  const savedCourse = await CourseModel.create({
    ...courseData,
    recipe: recipeId,
    course: userId,
  });
  return getCourseById(savedCourse._id.toString());
};

const updateCourse = async (id: string, courseData: CreateCourseInput) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate({ path: "course", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!updatedCourse) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }
  return updatedCourse;
};

const patchCourse = async (id: string, courseData: PatchCourseInput) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate({ path: "course", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!updatedCourse) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }
  return updatedCourse;
};

const deleteCourse = async (id: string) => {
  const deletedCourse = await CourseModel.findByIdAndDelete(id)
    .select("-__v")
    .populate({ path: "course", select: "-__v -password" })
    .populate({ path: "recipe", select: "-__v" });
  if (!deletedCourse) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }
  return deletedCourse;
};

export const courseService = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  patchCourse,
  deleteCourse,
};
