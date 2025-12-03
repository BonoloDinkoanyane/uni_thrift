import { PrismaClient } from "@prisma/client";

//singleton code prevents many instances of PrismaClient in development
// so that we don't exceed database connection limits

// Use a global variable to prevent multiple instances in development

// Use the existing PrismaClient instance if it exists, otherwise create a new one


// Only assign to global in development
declare global {
  // Prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;