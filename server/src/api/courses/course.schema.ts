import z from "zod";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

// ⬅️ Location schema for schedule
const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  radiusMeters: z.number(),
});

// ⬅️ Schedule item schema
const scheduleItemSchema = z.object({
  day: z.string(),
  startHour: z.string(),
  endHour: z.string(),
  location: locationSchema,
});

// ⬅️ Create Course Body schema
const createCourseBody = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  syllabusLink: z.url().optional(),
  students: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  materials: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  schedule: z.array(scheduleItemSchema).optional(),
});

// ⬅️ Full validation schemas
const createCourseSchema = {
  body: createCourseBody,
};

const updateCourseSchema = createCourseSchema;

const patchCourseSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createCourseBody.partial().refine((val) => Object.keys(val).length > 0, {
    message: "At least one field must be provided",
  }),
};

export const courseValidationSchema = {
  createCourseBody,
  createCourseSchema,
  updateCourseSchema,
  patchCourseSchema,
};