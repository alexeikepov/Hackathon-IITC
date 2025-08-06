import z from "zod";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

const createRecipeBody = z.object({
  imgSrc: z.string(),
  title: z.string(),
  ingredients: z.array(z.string()).min(1),
  instructions: z.string().min(10),
  description: z.string().min(10),
  category: z.union([
    z.literal("kosher"),
    z.literal("vegan"),
    z.literal("vegetarian"),
    z.literal("meat-based"),
    z.literal("gluten-free"),
  ]),
  preparationTime: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
});

const createRecipeSchema = {
  body: createRecipeBody,
};

const updateRecipeSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createRecipeBody,
};

const patchRecipeSchema = {
  params: globalValidationSchemas.objectIdParams,
  body: createRecipeBody
    .partial()
    .refine((val) => Object.keys(val).length > 0, {
      error: "At least one field must be provided",
    }),
};

export const recipeValidationSchemas = {
  createRecipeBody,
  createRecipeSchema,
  updateRecipeSchema,
  patchRecipeSchema,
};
