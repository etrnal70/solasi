import { z } from "zod";

const user = z.object({
    email: z.string(),
    password: z.string(),
});

const userProfile = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    profileName: z.string().optional(),
    profileImage: z.string().url().optional(),
    description: z.string().optional(),
});

export const userRegisterSchema = z.object({
    body: z.object({
        user,
    }),
});

export const userFindSchema = z.object({
    query: z.object({
        userId: z.number(),
    }),
});

export const userProfileUpdateSchema = z.object({
    body: z.object({
        userProfile,
    }),
});

export const userLoginSchema = userRegisterSchema;

export type UserCore = z.infer<typeof user>;
export type UserProfile = z.infer<typeof userProfile>;
