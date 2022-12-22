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
      try {
        const userId = user.id;
        const tokenPair = await generateToken(userId);

        return tokenPair;
      } catch (e) {
        return e;
      }
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

export async function findUser(keyword: string) {
  const users = await dbConn.user.findMany({
    where: {
      username: {
        search: keyword,
      },
    },
    select: {
      id: true,
      username: true,
      profileImage: true,
      description: true,
      createdAt: true,
    },
  });

  return users;
}

export async function getProfileUser(userId: number) {
  const user = await dbConn.user.findFirst({
    where: { id: userId },
    select: {
      _count: { select: { acceptedUpvotes: true, acceptedDownvotes: true } },
      id: true,
      username: true,
      email: true,
      profileImage: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return user;
}

export async function updateProfileUser(data: UserProfile, userId: number) {
  const updatedUser = await dbConn.user.update({
    where: {
      id: userId,
    },
    data: data,
    select: {
      id: true,
      username: true,
      email: true,
      profileImage: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return updatedUser;
}
