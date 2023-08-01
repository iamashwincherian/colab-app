import { trpc } from "./trpc";
import { ReactNode } from "react";

interface TrpcProviderProps {
  children: ReactNode;
}

const TrpcProvider = ({ children }: TrpcProviderProps) => {
  return <>{children}</>;
};

export default trpc.withTRPC(TrpcProvider);
