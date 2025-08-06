// controllers/inviteController.ts
import crypto from "crypto";
import InviteToken from "./inviteToken.model.js";
import { Request, Response } from "express";
import { sendInviteEmail } from "./sendInvite.js";

const generateInvite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const invite = new InviteToken({ token, email });
    await invite.save();

    const registrationLink = `${process.env.CLIENT_URL}/showregister?token=${token}`;
    const resInvite = await sendInviteEmail(email, registrationLink);
    console.log(resInvite);
    res.status(201).json({ link: registrationLink });
  } catch (err) {
    console.error("Error generating invite:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const inviteController = { generateInvite }