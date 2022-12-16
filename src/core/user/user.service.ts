import { dbConn } from "../../utils/db";
import { UserCore, UserProfile } from "./user.schema";
import { generateFromEmail } from "unique-username-generator";
import { compareSync, hashSync } from "bcrypt";
import { generateToken } from "../../utils/auth/auth.service";

export async function registerUser(data: UserCore) {
    const generatedUsername = generateFromEmail(data.email);
    const hashedPassword = hashSync(data.password, 10);
    const user = await dbConn.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            username: generatedUsername,
        },
    });

    return user;
}

export async function verifyCredsUser(data: UserCore) {
    const user = await dbConn.user.findFirst({
        where: {
            email: data.email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        },
    });

    if (user) {
        if (compareSync(data.password, user.password)) {
            const userId = user.id;
            const tokenPair = await generateToken(userId);

            return tokenPair;
        } else return Error("Password mismatch");
    } else {
        return Error("User not found");
    }
}

export async function deleteCredsUser(userId: number) {
    return await dbConn.userCredential.deleteMany({
        where: {
            userId,
        },
    });
}

export async function refreshCredsUser(userId: number) {
    await deleteCredsUser(userId);
    return await generateToken(userId);
}

export async function findUser(scope: string, keyword: string) {
    if (scope == "username") {
        const user = await dbConn.user.findMany({
            where: {
                username: {
                    search: keyword,
                },
            },
        });
        return user;
    } else if (scope == "profileName") {
        const user = await dbConn.user.findMany({
            where: {
                profileName: {
                    search: keyword,
                },
            },
        });
        return user;
    }
}

export async function getProfileUser(userId: number) {
    const user = await dbConn.user.findFirst({
        where: { id: userId },
        include: {
            _count: { select: { acceptedUpvotes: true, acceptedDownvotes: true } },
        },
    });

    return user;
}

export async function updateProfileUser(data: UserProfile, userId: number) {
    const updatedUser = await dbConn.user.update({
        where: {
            id: userId,
        },
        data,
    });

    return updatedUser;
}
