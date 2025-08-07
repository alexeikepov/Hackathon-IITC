import { UserModel } from "./user.model.js";
import { AppError } from "../../utils/appError.util.js";
import {
  CreateUserInput,
  PatchUserInput,
  UpdateUserInput,
  UserRole,
} from "./user.types.js";
import { CourseModel } from "../courses/course.model.js";
import mongoose from "mongoose";


const getCoursesByUserId = async (userId: string) => {

  const objectId = new mongoose.Types.ObjectId(userId);
  const user = await UserModel.findById(objectId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  console.log(user)
  console.log(user.role);
  let courses;
  if (user.role === UserRole.TEACHER) {
    courses = await CourseModel.find({ teacher: objectId });
  } else {
    courses = await CourseModel.find({ students: objectId });
    console.log(courses);

  }

  return courses;
}

const getAllUsers = () => {
  return UserModel.find()
    .select("-password -__v");
};

const getUserById = async (id: string) => {

  const objectId = new mongoose.Types.ObjectId(id);
  const user = await UserModel.findById(objectId)
    .select("-password -__v")


  if (!user) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials.", 400);
  }
  return user;
};

const createUser = async (userData: CreateUserInput) => {
  const emailExists = await UserModel.findOne({ email: userData.email });
  if (emailExists) {
    throw new AppError("Email already in use.", 409);
  }
  const savedUser = await UserModel.create(userData);
  return getUserById(savedUser._id.toString());
};

const updateUser = async (id: string, userData: UpdateUserInput) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    runValidators: true,
    new: true,
  })
    .select("-password -__v")

  if (!updatedUser) {
    throw new AppError("Invalid credentials.", 400);
  }
  return updatedUser;
};

const patchUser = async (id: string, userData: PatchUserInput) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    runValidators: true,
    new: true,
  })
    .select("-password -__v")

  if (!updatedUser) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return updatedUser;
};

const deleteUser = async (id: string) => {
  const deletedUser = await UserModel.findByIdAndDelete(id)
    .select("-password -__v")

  if (!deletedUser) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return deletedUser;
};

const getAllCourses = (id: string) => {
  return CourseModel.find({ reviewer: id })
    .select("-__v")
};

export const userService = {
  getCoursesByUserId,
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  getAllCourses,
};
