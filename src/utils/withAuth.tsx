"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../components/loading/Loading";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        if (!pathname || pathname === "/") {
          router.push("/auth/signIn");
        } else {
          router.push(`/auth/signIn?callback=${pathname}`);
        }
      }
    }, [session, router]);

    if (status === "authenticated") {
      return <Component {...props} />;
    } else {
      return <Loading />;
    }
  };
}
