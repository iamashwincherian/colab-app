import { useSession } from "next-auth/react";

export default function useUser() {
  const { data, status } = useSession();

  console.log("useUser", status, data);

  if (status === "authenticated") {
    if (data) {
      return data.user;
    }
  }

  return;
}
