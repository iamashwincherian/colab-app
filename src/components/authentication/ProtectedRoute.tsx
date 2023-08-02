"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loading from "../loading/Loading";
interface PageProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: PageProps) {
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.replace("/auth/signIn");
  } else if (status === "authenticated" && session) {
    return <>{children}</>;
  }

  return <Loading />;
}
