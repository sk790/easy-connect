import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {prisma:PrismaClient}

const prisma = globalForPrisma.prisma || new PrismaClient()

export default prisma;