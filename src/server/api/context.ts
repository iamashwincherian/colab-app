import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { db } from "../db";

export const createContext = (opts: CreateNextContextOptions) => {
  return {
    prisma: db,
  };
};
