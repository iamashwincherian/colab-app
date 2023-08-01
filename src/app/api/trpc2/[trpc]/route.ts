import {} from "@trpc/server/adapters/next";
import { appRouter } from "../../../../server/routes";
import { createContext } from "../../../../server/api/context";

const handler = (request: Request) => null;
// fetchRequestHandler({
//   endpoint: "/api/trpc",
//   req: request,
//   router: appRouter,
//   createContext,
// });

export { handler as GET, handler as POST };
