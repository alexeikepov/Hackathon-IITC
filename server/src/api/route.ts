/**
 * @swagger
 * tags:
 *   - name: Courses
 *     description: Course-related endpoints
 *   - name: Users
 *     description: User management endpoints
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Invite
 *     description: Invite token endpoints
 */

import { Router } from "express";
import courseRouter from "./courses/course.route.js";
import userRouter from "./users/user.route.js";
import authRouter from "./auth/auth.route.js";
import inviteRouter from "./invite/invite.route.js";

const router = Router();

router.use("/courses", courseRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/invite", inviteRouter);

export default router;
