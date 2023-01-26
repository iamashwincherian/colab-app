import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function Settings() {
  return (
    <PageLayout>
      <MainContent
        title={"Settings"}
        subtitle={
          "Personalize your user settings to tailor your experience on the platform."
        }
      >
        <ThemeSwitcher />
      </MainContent>
    </PageLayout>
  );
}
