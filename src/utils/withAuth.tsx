"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@components/loading/Loading";

export default function withAuth(Component: any) {
  return function ProtectedRoute({ ...props }) {
    const pathname = usePathname();

    let callbackUrl = "/auth/signin";
    if (pathname && pathname !== "/") {
      callbackUrl = `/auth/signin?callbackUrl=${pathname}`;
    }

    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        redirect(callbackUrl);
      },
    });

    if (status === "authenticated") {
      return <Component {...props} user={session.user} />;
    }

    return <Loading />;
  };
}
