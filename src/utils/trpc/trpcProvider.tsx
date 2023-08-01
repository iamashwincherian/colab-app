import { trpc } from "./trpc";
import { FC, ReactNode } from "react";

interface TrpcProviderProps extends FC {
  children: ReactNode;
}

const TrpcProvider = ({ children }: TrpcProviderProps) => {
  return <>{children}</>;
};

export default trpc.withTRPC(TrpcProvider) as FC;
