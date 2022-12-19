import { Router } from "express";
import { verifyAccessToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import {
    userFind,
    userGetPersonalProfile,
    userGetProfile,
    userLogin,
    userLogout,
    userRegister,
    userUpdateProfile,
} from "./user.controller";
import {
    userFindSchema,
    userGetProfileSchema,
    userLoginSchema,
    userProfileUpdateSchema,
    userRegisterSchema,
} from "./user.schema";

export const userRoute: Router = Router();

userRoute.post("/register", validate(userRegisterSchema), userRegister);
userRoute.post("/login", validate(userLoginSchema), userLogin);
userRoute.post("/logout", verifyAccessToken, userLogout);
userRoute.get("/user", validate(userFindSchema), userFind);
userRoute.get("/user/:userId", validate(userGetProfileSchema), userGetProfile);
userRoute.post("/user/profile", verifyAccessToken, validate(userProfileUpdateSchema), userUpdateProfile);
userRoute.get("/user/profile", verifyAccessToken, userGetPersonalProfile);
