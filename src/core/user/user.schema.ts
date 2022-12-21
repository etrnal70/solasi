import { z } from "zod";

const userBody = z.object({
    email: z.string().email(),
    password: z.string(),
});

const userProfileBody = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    profileName: z.string().optional(),
    profileImage: z.string().url().optional(),
    description: z.string().optional(),
});

export const userRegisterSchema = z.object({
    body: userBody,
});

export const userFindSchema = z.object({
    query: z.object({
        keyword: z.string(),
    }),
});

export const userGetProfileSchema = z.object({
    params: z.object({
        userId: z.string(),
    }),
});

export const userProfileUpdateSchema = z.object({
    body: userProfileBody,
});

export const userLoginSchema = userRegisterSchema;

export type UserCore = z.infer<typeof userBody>;
export type UserProfile = z.infer<typeof userProfileBody>;
