import { Schema, model } from "mongoose";
import { UserDocument, IUserModel } from "./user.types.js";
import { authService } from "../auth/auth.service.js";

const userSchema = new Schema<UserDocument, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await authService.hashPassword(this.password);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as {
    password?: string;
    $set?: { password?: string };
  };

  const plainPassword = update?.password ?? update?.$set?.password;
  if (!plainPassword) return next();

  const hashed = await authService.hashPassword(plainPassword);

  if (update.password) update.password = hashed;
  if (update.$set?.password) update.$set.password = hashed;

  next();
});

userSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "creator",
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "reviewer",
});

export const UserModel = model<UserDocument, IUserModel>("User", userSchema);
