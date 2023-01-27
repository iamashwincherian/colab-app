"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import { useUserContext } from "../../contexts/UserContext";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const pathname = usePathname() as string;
  const router = useRouter();
  const { data: session } = useSession();
  const { setUser } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const title = "Dashboard";
  const subtitle =
    "Track your project progress, stay on top of tasks and deadlines";

  useEffect(() => {
    if (session && searchParams.get("auth") === "success") {
      enqueueSnackbar(`Welcome back ${session.user?.name}`, {
        variant: "success",
      });
      router.replace(pathname);
      setUser(session?.user);
    }
  }, [session]);

  return (
    <PageLayout>
      <MainContent title={title} subtitle={subtitle}>
        <p className="text-primary">Dashboard content goes here</p>
      </MainContent>
    </PageLayout>
  );
}
