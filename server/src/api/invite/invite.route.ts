import { Router } from "express";
import { inviteController } from "./invite.controller.js"

const router = Router();

router.get("/", inviteController.generateInvite);

export default router;