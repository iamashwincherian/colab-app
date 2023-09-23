"use client";

import { useState, useEffect } from "react";
import { getProviders } from "next-auth/react";
import SignInPage from "./signInPage";

interface ProviderType {
  credentials: {
    name: string;
  };
}

export default function SignIn() {
  const [providers, setProviders] = useState<ProviderType | null>(null);

  const getProviderData = async () => {
    setProviders(await getProviders());
  };

  useEffect(() => {
    getProviderData();
  }, []);

  return <SignInPage providers={providers} />;
}
