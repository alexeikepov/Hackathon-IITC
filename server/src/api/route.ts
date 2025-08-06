import { Router } from "express";
import courseRouter from "./courses/course.route.js";
import userRouter from "./users/user.route.js";
import authRouter from "./auth/auth.route.js";
import inviteRouter from "./invite/invite.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/invite", inviteRouter);
router.use("/users", userRouter);
router.use("/courses", courseRouter);

export default router;
