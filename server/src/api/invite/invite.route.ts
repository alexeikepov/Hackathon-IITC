import { Router } from "express";
import { inviteController } from "./invite.controller.js"

const router = Router();

router.post("/generate", inviteController.generateInvite);

export default router;