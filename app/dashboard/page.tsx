"use client";

import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";

export default function Dashboard() {
  const title = "Dashboard";
  const subtitle =
    "Track your project progress, stay on top of tasks and deadlines";

  return (
    <PageLayout>
      <MainContent title={title} subtitle={subtitle}>
        <p className="text-primary">Dashboard content goes here</p>
      </MainContent>
    </PageLayout>
  );
}
