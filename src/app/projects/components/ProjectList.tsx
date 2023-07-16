"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSettingsContext } from "../../../contexts/SettingsContext";
import { useUserContext } from "../../../contexts/UserContext";

type ProjectType = {
  id: string;
  title: string;
  description?: string;
};

export default function ProjectList() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const { setSelectedProject } = useSettingsContext();
  const { user } = useUserContext();

  const fetchProjects = async () => {
    if (!user) return;

    const response = await fetch("http://127.0.0.1:8000/api/projects", {
      headers: { Authorization: "Bearer " + user.token },
    }).then((res) => res.json());
    setProjects(response);
  };

  useEffect(() => {
    fetchProjects();
  });

  const selectProject = (project: ProjectType) => {
    setSelectedProject(project);
    router.push(`/projects/${project.id}/tickets`);
  };

  return (
    <div className="flex gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border dark:border-none rounded-md w-60 h-52 p-4 dark:bg-dark-3 hover:dark:bg-dark-2 hover:shadow cursor-pointer transition-colors"
          onClick={() => selectProject(project)}
        >
          <p className="dark:text-white">{project.name}</p>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            <small>{project.description}</small>
          </p>
        </div>
      ))}
    </div>
  );
}
