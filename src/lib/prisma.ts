// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma"; // or just "prisma/client" if not customized

// Prevent multiple instances during dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: logs every query
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
