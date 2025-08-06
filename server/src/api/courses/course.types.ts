import  { Types, HydratedDocument, Model } from "mongoose";
import z from "zod";
import { courseValidationSchema } from "./course.schema.js";

export interface ICourse {
  title: string,
  description: string,
  syllabusLink: string,
  teacher: { type: Types.ObjectId, ref: "User" },
  students: [{ type: Types.ObjectId, ref: "User" }],
  materials: [{ type: Types.ObjectId, ref: "Material" }],
  schedule: [{
    day: string,
    startHour: string,
    endHour: string,
    location: {
      name: string,
      lat: Number,
      lng: Number,
      radiusMeters: Number
    }
  }]
}

export type CreateCourseInput = z.infer<
  typeof courseValidationSchema.createCourseBody
>;

export type UpdateCourseInput = z.infer<
  typeof courseValidationSchema.createCourseBody
>;

export type PatchCourseInput = Partial<
  z.infer<typeof courseValidationSchema.createCourseBody>
>;

// Mongo types/interfaces
export type CourseDocument = HydratedDocument<ICourse>;

export interface ICourseModel extends Model<CourseDocument> { }
