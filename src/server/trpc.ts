import { initTRPC, TRPCError } from "@trpc/server";
import { getToken } from "next-auth/jwt";
import { createContext } from "./api/context";

const t = initTRPC.context<typeof createContext>().create();

const authenticate = t.middleware(
  async ({ ctx, ctx: { req, prisma }, next }) => {
    const sessionToken = req.cookies["next-auth.session-token"];
    console.log(req.cookies);
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      select: { userId: true },
    });
    if (!session) {
      throw new TRPCError({
        message: "You are not authorized",
        code: "FORBIDDEN",
      });
    }

    return next({ ctx: { ...ctx, userId: session.userId } });
  }
);

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(authenticate);
