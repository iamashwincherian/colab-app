"use client"

import { useEffect, useState } from "react";
const STORE_KEY_INITIAL = "context_"

const store = (key: string, data: any = null) => {
  if(!data) {
    const item = localStorage.getItem(key)
    if(!item) return
    return JSON.parse(item)
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export default function useContextLocalStorage(key: string, value: any) {
  let initialValue = value
  let storeKey = STORE_KEY_INITIAL + key
  const isServer = typeof window === "undefined"

  const [state, setState] = useState(null)
  const [initStateRender, setInitStateRender] = useState(true)

  useEffect(() => {
    if(!isServer) {
      const storedItem = store(storeKey)
      if(initStateRender) {
        setInitStateRender(false)
        if(storedItem) {
          setState(storedItem)
        } else {
          store(storeKey, initialValue)
        }
      }
    }
  }, [])


  useEffect(() => {
    if(!isServer && state) {
      if(initStateRender) return
      store(storeKey, state)
    }
  }, [state]);

  return [state, setState] as const;
}
