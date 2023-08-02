"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../components/loading/Loading";

export default function withAuth(Component: any) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        if (!pathname || pathname === "/") {
          router.push("/auth/signin");
        } else {
          router.push(`/auth/signin?callback=${pathname}`);
        }
      }
    }, [session, router]);

    if (status === "authenticated") {
      return <Component {...props} user={session.user} />;
    }

    return <Loading />;
  };
}
