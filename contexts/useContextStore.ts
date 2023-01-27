"use client"

import { useEffect, useState } from "react";

export default function usePersistentContextStore(key: string, value: any) {
  const storeKey = "context_"+ key
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(storeKey);
    return persistedState ? JSON.parse(persistedState) : value;
  });

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(state));
  }, [storeKey, state]);

  return [state, setState];
}
