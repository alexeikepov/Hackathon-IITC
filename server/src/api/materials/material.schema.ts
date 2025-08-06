import z from "zod";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

const createMaterialBody = z.object({
  course: globalValidationSchemas.objectIdParams,
  title: z.string().min(1, { message: "Title is required" }),
  type: z.enum(["video", "pdf", "github", "link"]),
  url: z.url({ message: "Must be a valid URL" }),
  uploadedBy: globalValidationSchemas.objectIdParams,
});

const createMaterialSchema = {
  body: createMaterialBody,
};

const updateMaterialSchema = {
  body: createMaterialBody,
};

const patchMaterialSchema = {
  body: createMaterialBody.partial().refine((val) => Object.keys(val).length > 0, {
    error: "At least one field must be provided",
  }),
};

export const materialValidationSchema = {
  createMaterialBody,
  createMaterialSchema,
  updateMaterialSchema,
  patchMaterialSchema,
};