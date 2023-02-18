"use client"

import { useRouter } from "next/navigation"

type ProjectType = {
  id: number;
  title: string;
  description?: string;
};

const projects: ProjectType[] = [
  {
    id: 0,
    title: "Collaborative Task Manager",
    description:
      "A task management system that allows multiple users to collaborate on a single project.",
  },
  {
    id: 1,
    title: "Fitness Tracker App",
    description:
      "A mobile app that allows users to track their fitness goals and progress.",
  },
];

export default function ProjectList() {
  const router = useRouter() 
  const handleOnClick = () => {
    router.push("/")
  }

  return (
    <div className="flex gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border dark:border-none rounded-md w-60 h-52 p-4 dark:bg-dark-3 hover:dark:bg-dark-2 hover:shadow cursor-pointer transition-colors"
          onClick={handleOnClick}
        >
          <p className="dark:text-white">{project.title}</p>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            <small>{project.description}</small>
          </p>
        </div>
      ))}
    </div>
  );
}
