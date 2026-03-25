import { PrismaClient } from "@prisma/client"

const globleForPrisma = globalThis ;

const prisma = globleForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globleForPrisma.prisma = prisma;
}

export default prisma;