import { PrismaClient } from "@prisma/client";

let dbConn: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

dbConn = global.__db;
export { dbConn };
