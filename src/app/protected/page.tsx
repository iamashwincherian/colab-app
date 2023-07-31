"use client";

import { useSession } from "next-auth/react";

export default function Protected() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      console.error("You are not logged in");
    },
  });

  return (
    <div>
      <h3>This is a protected page</h3>
      {session?.user && <p>Welcome back {session?.user?.name}</p>}
    </div>
  );
}
