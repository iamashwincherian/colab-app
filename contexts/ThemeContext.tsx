import { createContext, ReactNode, useContext } from "react";
import usePersistentContextStore from "./useContextStore";

type Theme = "light" | "dark";

const DEFAULT_THEME: Theme = "light";

interface ThemeContextInterface {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: DEFAULT_THEME,
  setTheme() {},
  toggleTheme() {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = usePersistentContextStore("theme", DEFAULT_THEME);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (theme) => setTheme(theme),
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
