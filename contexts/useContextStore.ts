"use client"

import { useEffect, useState } from "react";
const STORE_KEY_INITIAL = "context_"

const store = (key: string, value: any = null) => {
  if(!value) {
    const item = localStorage.getItem(key)
    if(!item) return
    return item
  }
  localStorage.setItem(key, value)
}


export default function usePersistentContextStore(key: string, value: any) {
  let initialValue = value
  let storeKey = STORE_KEY_INITIAL + key
  const isServer = typeof window === "undefined"

  const [state, setState] = useState(initialValue)
  const [initStateRender, setInitStateRender] = useState(true)

  useEffect(() => {
    if(!isServer) {
      const storedItem = store(storeKey)
      if(initStateRender) {
        setInitStateRender(false)
        if(storedItem) {
          setState(JSON.parse(storedItem))
        } else {
          store(storeKey, JSON.stringify(initialValue))
        }
      }
    }
  }, [])


  useEffect(() => {
    if(!isServer && state) {
      if(initStateRender) return
      console.log("setting user", key, state)
      store(storeKey, JSON.stringify(state))
    }
  }, [state]);

  return [state, setState];
}
