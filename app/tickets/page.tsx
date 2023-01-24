import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import Sidebar from "../../components/sidebar/Sidebar";
import Empty from "./empty";

export default function Home() {
  const title = "Tickets";
  const subtitle =
    "Efficiently organize and prioritize your issues to keep your team on track";

  return (
    <PageLayout>
      <MainContent title={title} subtitle={subtitle}>
        {/* <p className="text-red-500">Colab App Home</p> */}
        <Empty />
      </MainContent>
    </PageLayout>
  );
}
