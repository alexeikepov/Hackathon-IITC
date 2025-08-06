import { Router } from "express";
import courseRouter from "./courses/course.route.js";
import userRouter from "./users/user.route.js";
import authRouter from "./auth/auth.route.js";

const router = Router();
console.log("router api")
router.use("/courses", courseRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
