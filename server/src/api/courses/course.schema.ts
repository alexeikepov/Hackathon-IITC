import z from "zod";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

const createCourseBody = z.object({
  rating: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  content: z.string().optional(),
});

const createCourseSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createCourseBody,
};

const updateCourseSchema = createCourseSchema;

const patchCourseSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createCourseBody
    .partial()
    .refine((val) => Object.keys(val).length > 0, {
      error: "At least one field must be provided",
    }),
};

export const courseValidationSchema = {
  createCourseBody,
  createCourseSchema,
  updateCourseSchema,
  patchCourseSchema,
};
