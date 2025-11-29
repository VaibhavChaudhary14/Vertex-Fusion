<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
=======
import { PrismaClient } from '@prisma/client';
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
<<<<<<< HEAD
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
=======
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
  globalForPrisma.prisma = prisma;
}
