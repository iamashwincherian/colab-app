import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../../server/routes";

export type ListProp = inferRouterOutputs<AppRouter>["lists"]["find"] | null;
export type CardProp = inferRouterOutputs<AppRouter>["cards"]["find"] | null;
export type BoardProp = inferRouterOutputs<AppRouter>["boards"]["find"] | null;
