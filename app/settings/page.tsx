import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";

export default function Settings() {
  return (
    <PageLayout>
      <MainContent
        title={"Settings"}
        subtitle={
          "Personalize your user settings to tailor your experience on the platform."
        }
      >
        <p className="text-primary">Settings goes here</p>
      </MainContent>
    </PageLayout>
  );
}
