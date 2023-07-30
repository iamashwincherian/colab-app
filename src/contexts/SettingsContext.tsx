import { createContext, ReactNode, useContext } from "react";
import useContextLocalStorage from "./useContextLocalStorage";

type Theme = "light" | "dark";
type SettingsType = {
  activeProject: object;
  theme: Theme;
};

type SettingsContextType = {
  settings: SettingsType | null;
  toggleTheme: () => void;
  setSelectedProject: (projectId: string) => void;
};

const DEFAULT_THEME: Theme = "light";

const defaultSettings: SettingsType = {
  activeProject: {},
  theme: DEFAULT_THEME,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  toggleTheme() {},
  setSelectedProject() {},
});

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = useContextLocalStorage(
    "settings",
    defaultSettings
  );

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSelectedProject: (projectId) =>
          setSettings({
            ...settings,
            activeProject: projectId,
          }),
        toggleTheme: () => {
          return {
            ...settings,
            theme: settings.theme === "light" ? "dark" : "light",
          };
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
