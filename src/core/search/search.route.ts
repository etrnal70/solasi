import { Router } from "express";
import { validate } from "../../utils/validate/validate.helper";
import { search } from "./search.controller";
import { searchSchema } from "./search.schema";

export const searchRoute: Router = Router();

searchRoute.get("/search", validate(searchSchema), search);
