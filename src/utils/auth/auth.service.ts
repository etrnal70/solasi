import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { dbConn } from "../db";

export async function getAuthData(
    userId: number,
    uuid: string,
    // CredentialType enum
    type: "ACCESS" | "REFRESH",
) {
    return await dbConn.userCredential.findFirstOrThrow({
        where: {
            userId: userId,
            uuid: uuid,
            type: type,
        },
    });
}

export async function generateToken(userId: number): Promise<Object | Error> {
    const JWT_SECRET: string = process.env.JWT_SECRET as string;
    const accessUuid = randomUUID();
    const accessToken = sign(
        {
            userId: userId,
            uuid: accessUuid,
        },
        JWT_SECRET,
        { expiresIn: "3h" },
    );
    const refreshUuid = randomUUID();
    const refreshToken = sign(
        {
            userId: userId,
            uuid: refreshUuid,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
    );

    // Store credentials in database
    try {
        await dbConn.userCredential.create({
            data: {
                userId: userId,
                uuid: accessUuid,
                type: "ACCESS",
            },
        });
        await dbConn.userCredential.create({
            data: {
                userId: userId,
                uuid: refreshUuid,
                type: "REFRESH",
            },
        });
    } catch (e) {
        return new Error("failed to insert validation uuid to db");
    }

    return { accessToken: accessToken, refreshToken: refreshToken };
}
