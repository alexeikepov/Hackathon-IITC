// controllers/inviteController.ts
import crypto from "crypto";
import InviteToken from "./inviteToken.model.js";
import { Request, Response } from "express";

export const generateInviteLink = async (req: Request, res: Response) => {
  const { email } = req.body;

  const token = crypto.randomBytes(32).toString("hex");

  const invite = new InviteToken({ token, email });
  await invite.save();

  const registrationLink = `${process.env.APP_LINK}?token=${token}`;
  res.json({ link: registrationLink });
};