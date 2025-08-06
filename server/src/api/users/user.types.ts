import mongoose, { HydratedDocument, Model } from "mongoose";
import { ICourse } from "../courses/course.types.js";
import { userValidationSchema } from "./user.schema.js";
import z from "zod";

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: { type: string, enum: ["student", "admin", "teacher"], default: "student" };
  phone: string;
  location?: string,
  militaryUnit?: string,
  joinedCourses?: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = z.infer<
  typeof userValidationSchema.createUserBody
>;
export type UpdateUserInput = z.infer<
  typeof userValidationSchema.createUserBody
>;
export type PatchUserInput = Partial<
  z.infer<typeof userValidationSchema.createUserBody>
>;

// Response
export type ResponseUser = Omit<IUser, "password"> & {
  courses?: ICourse[];
};

// Mongo types/interfaces
export type UserDocument = HydratedDocument<IUser>;

export interface IUserModel extends Model<UserDocument> { }
