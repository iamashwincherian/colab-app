import { trpc } from "./trpc";
import { ReactNode } from "react";

interface TrpcProviderProps {
  children: ReactNode;
}

// TODO: Fix the Provider Type
const TrpcProvider = ({ children }: TrpcProviderProps) => {
  return <>{children}</>;
};

export default trpc.withTRPC(TrpcProvider);
