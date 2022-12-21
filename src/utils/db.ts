import { PrismaClient } from "@prisma/client";

function excludeField<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

let dbConn: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

dbConn = global.__db;
export { dbConn, excludeField };
