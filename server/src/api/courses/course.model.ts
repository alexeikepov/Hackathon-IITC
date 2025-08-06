import { Schema, Types, model } from "mongoose";
import { CourseDocument, ICourseModel } from "./course.types.js";
// models/Course.ts
import mongoose from "mongoose";

const courseSchema = new Schema<CourseDocument, ICourseModel>(
  {
  title: String,
  description: String,
  syllabusLink: String,
  teacher: { type: Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
  schedule: [{
    day: String,
    startHour: String,
    endHour: String,
    location: {
      name: String,
      lat: Number,
      lng: Number,
      radiusMeters: Number
    }
  }],
}, { timestamps: true });

export const CourseModel = model<CourseDocument, ICourseModel>(
  "Course",
  courseSchema
);


