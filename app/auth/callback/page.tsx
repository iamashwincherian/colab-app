"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import Loading from "../../../components/loading/Loading";
import { useUserContext } from "../../../contexts/UserContext";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session, status } = useSession();
  const { setUser, logoutUser } = useUserContext();

  if (status === "authenticated" && session) {
    if (searchParams.get("auth") === "success") {
      enqueueSnackbar(`Welcome ${session?.user?.name}`, {
        variant: "success",
      });
      setUser(session?.user);

      // TODO: If recently opened project exists ? redirect to /dashboard : redirect to /projects
      router.replace("/projects");
    }
  } else if (status === "unauthenticated") {
    if (searchParams.get("logout") === "success") {
      logoutUser();
      router.replace("/auth/signin");
    }
  }

  return <Loading />;
}
