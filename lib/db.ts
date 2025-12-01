"use server";

import { PrismaClient } from "../lib/generated/prisma";

//singleton code prevents many instances of PrismaClient in development
// so that we don't exceed database connection limits

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;