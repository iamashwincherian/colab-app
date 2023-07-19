import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";

export const createContext = (opts: CreateNextContextOptions) => {
  const prisma = new PrismaClient();
  return {
    prisma,
  };
};
