import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import Logo from "../../components/logo/logo";
import ProjectList from "./components/ProjectList";

export default function Projects() {
  const projectListItems = [
    {
      id: 0,
      title: "Project 1",
      description: "This is description of project 1",
    },
    {
      id: 1,
      title: "Project 3",
      description: "This is description of project 2",
    },
  ];

  return (
    <FullScreenLayout>
      <div className="flex flex-col">
        <div className="flex flex-col py-6 px-8 w-screen shadow">
          <div className="mb-5">
            <Logo />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-zinc-300 capitalize">
            Choose a project
          </h1>
          <p className="mt-2 text-gray-500 dark:text-zinc-500">
            Select an existing project or create a new one to manage your work
            and collaborate with your team
          </p>
        </div>
        <div className="mt-1 bg-white px-8 py-6">
          <ProjectList items={projectListItems} />
        </div>
      </div>
    </FullScreenLayout>
  );
}
