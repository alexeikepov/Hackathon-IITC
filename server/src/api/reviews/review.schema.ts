import z from "zod";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

const createReviewBody = z.object({
  rating: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  content: z.string().optional(),
});

const createReviewSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createReviewBody,
};

const updateReviewSchema = createReviewSchema;

const patchReviewSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createReviewBody
    .partial()
    .refine((val) => Object.keys(val).length > 0, {
      error: "At least one field must be provided",
    }),
};

export const reviewValidationSchema = {
  createReviewBody,
  createReviewSchema,
  updateReviewSchema,
  patchReviewSchema,
};
