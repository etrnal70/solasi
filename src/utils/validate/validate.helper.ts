import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).send(e.errors);
    }
    return res.status(400).send(e);
  }
};
