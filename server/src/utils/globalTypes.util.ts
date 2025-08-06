import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import z from "zod";
import { globalValidationSchemas } from "../validationSchemas.ts/globalValidation.schema.js";

export type ValidationSchemas = {
  params?: z.ZodType<any, any, any>;
  body?: z.ZodType<any, any, any>;
  query?: z.ZodType<any, any, any>;
};

export type IdParams = z.infer<typeof globalValidationSchemas.objectIdParams>;

export interface AuthenticatedRequest<
  Params = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: string;
    email: string;
  };
}
