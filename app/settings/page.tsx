"use client";

import { Switch } from "@headlessui/react";

import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import { useThemeContext } from "../../contexts/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useThemeContext();
  const darkMode: boolean = theme === "dark";

  return (
    <PageLayout>
      <MainContent
        title={"Settings"}
        subtitle={
          "Personalize your user settings to tailor your experience on the platform."
        }
      >
        <div className="flex justify-between items-center mt-4 w-52">
          <p className="text-gray-900 dark:text-zinc-300">Dark theme</p>
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            className={`${
              darkMode ? "bg-primary" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full ml-4`}
          >
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </MainContent>
    </PageLayout>
  );
}
