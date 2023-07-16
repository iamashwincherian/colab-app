"use client";

import { Switch } from "@headlessui/react";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext();
  const darkMode: boolean = theme === "dark";

  return (
    <div className="flex justify-between items-center">
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        className={`${
          darkMode ? "bg-dark-3" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full ml-4`}
      >
        <span
          className={`${
            darkMode ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
}
