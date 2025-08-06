import z from "zod";

const createUserBody = z.object({
  email: z.email(),
  password: z.string().min(6).max(15),
  name: z
    .string()
    .trim()
    .refine((value) => value.split(" ").length === 2, {
      error: "Name must contain exactly two words",
    }),
});

const createUserSchema = {
  body: createUserBody,
};

const updateUserSchema = {
  body: createUserBody,
};

const patchUserSchema = {
  body: createUserBody.partial().refine((val) => Object.keys(val).length > 0, {
    error: "At least one field must be provided",
  }),
};

export const userValidationSchema = {
  createUserBody,
  createUserSchema,
  updateUserSchema,
  patchUserSchema,
};
