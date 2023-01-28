import { createContext, ReactNode, useContext } from "react";
import usePersistentContextStore from "./useContextStore";

interface UserContextInterface {
  user: object;
  setUser: (user: object) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextInterface>({
  user: {},
  setUser() {},
  logoutUser() {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = usePersistentContextStore("user", {});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (user = {}) => setUser(user),
        logoutUser: () => setUser({}),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
