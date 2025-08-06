import express from "express";
import morgan from "morgan";
import initMongo from "./db.js"
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./swagger.js"; // 👈 add this near the top

import { AppError } from "./utils/appError.util.js";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware.js";
import router from "./api/route.js";
import cookieParser from "cookie-parser";

// Read from .env
dotenv.config();
const PORT = process.env.PORT;

if (!PORT) {
  console.log("Error reading for .env");
  process.exit(1);
}

// Init express app
const app = express();
initMongo();

// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
setupSwagger(app);

// Api endpoints
app.use("/api", router);

// Global error handling middleware
app.use((req, _res, next) => {
  return next(new AppError(`Route ${req.originalUrl} not found.`, 404));
});
app.use(globalErrorHandler);

// Start listening
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server:", err.message);
    process.exit(1);
  }
  console.log("Server listening on PORT:", PORT);
});
