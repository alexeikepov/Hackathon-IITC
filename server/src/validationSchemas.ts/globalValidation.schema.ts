import { Types } from "mongoose";
import z from "zod";

const objectIdParams = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    error: "Invalid ObjectId",
  }),
});

const getByIdSchema = {
  params: objectIdParams,
};

export const globalValidationSchemas = { objectIdParams, getByIdSchema };
