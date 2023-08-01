import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { db as prisma } from "../db";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req } = opts;
  return { req, prisma };
};
