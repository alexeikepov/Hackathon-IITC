import { CourseModel } from "./course.model.js";
import { AppError } from "../../utils/appError.util.js";
import { CreateCourseInput, PatchCourseInput } from "./course.types.js";
import mongoose from "mongoose";

const populateOptions = [
  { path: "teacher", select: "-__v -password" },
  { path: "students", select: "-__v -password" },
  { path: "materials", select: "-__v" },
];

const getAllCourses = () => {
  return CourseModel.find()
    .select("-__v")
    .populate(populateOptions);
};

const getCourseById = async (id: string) => {
  const course = await CourseModel.findById(id)
    .select("-__v")
    .populate(populateOptions);

  if (!course) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }
  return course;
};

const createCourse = async (
  userId: string,
  courseData: CreateCourseInput
) => {
  const savedCourse = await CourseModel.create({
    ...courseData,
    teacher: userId,
  });
  const course = await getCourseById(savedCourse._id.toString());
  console.log("in course create", course)

  return course;
};

const updateCourse = async (id: string, courseData: CreateCourseInput) => {
  console.log("update course")
  const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate(populateOptions);

  if (!updatedCourse) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }

  return updatedCourse;
};

const patchCourse = async (id: string, courseData: PatchCourseInput) => {
    const objectId = new mongoose.Types.ObjectId(id);
  console.log(objectId);
  const updatedCourse = await CourseModel.findByIdAndUpdate(objectId, courseData, {
    runValidators: true,
    new: true,
  })
    .select("-__v")
    .populate(populateOptions);

  if (!updatedCourse) {
    throw new AppError(`Course with ID: ${id} not found.`, 404);
  }

  return updatedCourse;
};

const deleteCourse = async (id: string) => {
  const deletedCourse = await CourseModel.findByIdAndDelete(id)
    .select("-__v")
    .populate(populateOptions);

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