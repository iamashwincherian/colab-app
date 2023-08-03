import { initTRPC, TRPCError } from "@trpc/server";
import { getToken } from "next-auth/jwt";
import { createContext } from "./api/context";

const t = initTRPC.context<typeof createContext>().create();

const ACCESS_TOKEN = "next-auth.session-token";

const authenticate = t.middleware(
  async ({ ctx, ctx: { req, prisma }, next }) => {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      cookieName: ACCESS_TOKEN,
    });
    console.log("token", token);

    const user = await prisma.user.findUnique({
      where: { email: token?.email || undefined },
    });

    if (!user) {
      throw new TRPCError({
        message: "You are not authorized",
        code: "FORBIDDEN",
      });
    }

    return next({ ctx: { ...ctx, userId: user.id } });
  }
);

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(authenticate);
