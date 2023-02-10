type ProjectType = {
  id: number;
  title: string;
  description?: string;
};

type PropTypes = {
  items: ProjectType[];
};

export default function ProjectList({ items }: PropTypes) {
  return (
    <div className="flex gap-8">
      {items.map((project) => (
        <div
          key={project.id}
          className="border rounded-md w-60 h-52 p-4 hover:shadow cursor-pointer"
        >
          {project.title}
        </div>
      ))}
    </div>
  );
}
