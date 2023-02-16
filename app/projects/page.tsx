import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import Logo from "../../components/logo/logo";
import ProjectList from "./components/ProjectList";

export default function Projects() {
  return (
    <FullScreenLayout>
      <div className="flex flex-col dark:bg-dark h-screen">
        <div className="flex flex-col py-6 px-8 w-screen shadow dark:shadow-md dark:bg-dark-2">
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
        <div className="mt-1 bg-white dark:bg-dark px-8 py-6">
          <ProjectList />
        </div>
      </div>
    </FullScreenLayout>
  );
}
