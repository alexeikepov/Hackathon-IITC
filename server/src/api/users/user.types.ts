import { HydratedDocument, Model } from "mongoose";
import { IRecipe } from "../recipes/recipe.types.js";
import { IReview } from "../reviews/review.types.js";
import { userValidationSchema } from "./user.schema.js";
import z from "zod";

export interface IUser {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = z.infer<
  typeof userValidationSchema.createUserBody
>;
export type UpdateUserInput = z.infer<
  typeof userValidationSchema.createUserBody
>;
export type PatchUserInput = Partial<
  z.infer<typeof userValidationSchema.createUserBody>
>;

// Response
export type ResponseUser = Omit<IUser, "password"> & {
  recipes?: IRecipe[];
  reviews?: IReview[];
};

// Mongo types/interfaces
export type UserDocument = HydratedDocument<IUser>;

export interface IUserModel extends Model<UserDocument> {}
