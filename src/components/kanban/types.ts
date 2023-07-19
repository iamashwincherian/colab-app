import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../../server/routes";

export type CardProp = inferRouterOutputs<AppRouter>["data"]["cards"] | never[];
export type ListProp = inferRouterOutputs<AppRouter>["data"]["list"] | never[];
