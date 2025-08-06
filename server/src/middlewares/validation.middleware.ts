import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.util.js";
import { ZodError } from "zod";
import { ValidationSchemas } from "../utils/globalTypes.util.js";

export const validate =
  (schema: ValidationSchemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.params) req.params = schema.params.parse(req.params);
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorsArray = err.issues.map((issue) => issue.message);
        return next(new AppError("Validation error", 400, errorsArray));
      }
      return next(err);
    }
  };
