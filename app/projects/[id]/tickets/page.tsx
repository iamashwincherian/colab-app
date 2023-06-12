import ProtectedRoute from "../../../../components/authentication/ProtectedRoute";
import KanbanBoard from "../../../../components/kanban/KanbanBoard";
import PageLayout from "../../../../components/layouts/PageLayout";
import MainContent from "../../../../components/layoutWrapper/MainContent";

const title = "Tickets";
const subtitle =
  "Efficiently organize and prioritize your issues to keep your team on track";

export default function Home() {
  return (
    <ProtectedRoute>
      <PageLayout>
        <MainContent title={title} subtitle={subtitle}>
          <KanbanBoard />
        </MainContent>
      </PageLayout>
    </ProtectedRoute>
  );
}
