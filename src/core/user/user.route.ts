import { Router } from "express";
import { verifyAccessToken } from "../../utils/auth/auth.helper";
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
userRoute.post("/logout", verifyAccessToken, userLogout);
// userRoute.get("/search", validate(userFindSchema), userFind);
userRoute.get("/user/:userId", validate(userGetProfileSchema), userGetProfile);
userRoute.put("/user", verifyAccessToken, validate(userProfileUpdateSchema), userUpdateProfile);
userRoute.get("/user", verifyAccessToken, userGetPersonalProfile);
