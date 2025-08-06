import { userService } from "./user.service.js";
import { PatchUserInput, ResponseUser, UpdateUserInput } from "./user.types.js";
import { Request, Response, NextFunction } from "express";
import {
  AuthenticatedRequest,
  IdParams,
} from "../../utils/globalTypes.util.js";
import { ICourse } from "../courses/course.types.js";

const getAllUsers = async (
  _req: Request,
  res: Response<ResponseUser[]>,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (
  req: Request<IdParams>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (
  req: AuthenticatedRequest<{}, {}, UpdateUserInput>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const { password, ...updatedUser } = (
      await userService.updateUser(req.user!.id, req.body)
    ).toObject();
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

const patchUser = async (
  req: AuthenticatedRequest<{}, {}, PatchUserInput>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const updatedUser = await userService.patchUser(req.user!.id, req.body);
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const deletedUser = await userService.deleteUser(req.user!.id);
    return res.status(200).json(deletedUser);
  } catch (err) {
    return next(err);
  }
};


const getAllCourses = async (
  req: AuthenticatedRequest,
  res: Response<ICourse[]>,
  next: NextFunction
) => {
  try {
    const reviews = await userService.getAllCourses(req.user!.id);
    return res.status(200).json(reviews);
  } catch (err) {
    return next(err);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  updateUser,
  patchUser,
  deleteUser,
  getAllCourses,
};
