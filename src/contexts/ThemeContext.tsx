import { createContext, ReactNode, useContext, useState } from "react";
import useContextLocalStorage from "./useContextLocalStorage";

type Theme = "light" | "dark";

const DEFAULT_THEME: Theme = "light";

interface ThemeContextInterface {
  theme: Theme;
  setId: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: DEFAULT_THEME,
  setId() {},
  setTheme() {},
  toggleTheme() {},
});

export const useThemeContext = () => useContext(ThemeContext);
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useContextLocalStorage("theme", DEFAULT_THEME);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (theme) => setTheme(theme),
        toggleTheme: () => {
          return setTheme(theme === "light" ? "dark" : "light");
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
