import "../materials/material.model.js"; // קודם זה
import { Schema, Types, model } from "mongoose";
import { CourseDocument, ICourseModel } from "./course.types.js";


const courseSchema = new Schema<CourseDocument, ICourseModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    syllabusLink: {
      type: String,
      trim: true,
    },
    teacher: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [{
      type: Types.ObjectId,
      ref: "User",
      default: [],
    }],
    schedule: [{
      day: {
        type: String,
        required: true,
      },
      startHour: {
        type: String,
        required: true,
      },
      endHour: {
        type: String,
        required: true,
      },
      location: {
        name: {
          type: String,
          required: true,
        },
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
        radiusMeters: {
          type: Number,
          required: true,
        },
      }
    }]
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
courseSchema.virtual("materials", {
  ref: "Material",              // השם של המודל השני
  localField: "_id",            // השדה במודל הזה
  foreignField: "course",       // השדה במודל השני שמפנה לכאן
});
export const CourseModel = model<CourseDocument, ICourseModel>(
  "Course",
  courseSchema
);