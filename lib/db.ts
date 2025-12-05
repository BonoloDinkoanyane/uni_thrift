import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

// Singleton code prevents creating multiple PrismaClients in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Export the singleton instance so other files can import it
export const db = globalForPrisma.prisma || prisma;