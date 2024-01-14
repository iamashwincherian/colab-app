import ProtectedRoute from "../../components/authentication/ProtectedRoute";
import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";

export default function Settings() {
  return (
    <ProtectedRoute>
      <PageLayout>
        <MainContent
          title={"Settings"}
          subtitle={
            "Personalize your user settings to tailor your experience on the platform."
          }
        ></MainContent>
      </PageLayout>
    </ProtectedRoute>
  );
}
