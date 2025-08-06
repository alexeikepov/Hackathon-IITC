import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";
import { LoginInput, RegisterInput } from "./auth.types.js";
import { ResponseUser } from "../users/user.types.js";
import { AuthenticatedRequest } from "../../utils/globalTypes.util.js";
import { userService } from "../users/user.service.js";
import inviteTokenModel from "../invite/inviteToken.model.js";

const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {

    const { newUser, token } = await authService.register(req.body)

    const { password, ...userWithoutPassword } = newUser.toObject();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    return next(err);
  }
};

const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.login(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const logout = async (_req: AuthenticatedRequest, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  return res.status(200).json({ success: true });
};

const me = async (
  req: AuthenticatedRequest,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const { password, ...user } = (
      await userService.getUserById(req.user!.id)
    ).toObject();
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};
const showRegisterPage = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  const { token } = req.query;
  try {

    const invite = await inviteTokenModel.findOne({ token, used: false, expiresAt: { $gt: new Date() } });
    if (!invite) {
      return res.status(400).send("Invalid or expired registration link");
    }
    return res.status(200).json(invite);
  } catch (err) {
    return next({ error: err, message: "showRegisterPage error" }
    );

  }

};
export const authController = { login, register, logout, me, showRegisterPage };
