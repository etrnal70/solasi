import { Router } from "express";
import { verifyAccessPair, verifyToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import {
  userGetPersonalProfile,
  userGetProfile,
  userLogin,
  userLogout,
  userRegister,
  userUpdateProfile,
} from "./user.controller";
import { userGetProfileSchema, userLoginSchema, userProfileUpdateSchema, userRegisterSchema } from "./user.schema";

export const userRoute: Router = Router();

userRoute.post("/register", validate(userRegisterSchema), userRegister);
userRoute.post("/login", validate(userLoginSchema), userLogin);
userRoute.post("/logout", verifyToken, verifyAccessPair, userLogout);
userRoute.get("/user/:userId", validate(userGetProfileSchema), userGetProfile);
userRoute.put("/user", verifyToken, verifyAccessPair, validate(userProfileUpdateSchema), userUpdateProfile);
userRoute.get("/user", verifyToken, verifyAccessPair, userGetPersonalProfile);
