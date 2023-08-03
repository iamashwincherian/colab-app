import { redirect, useRouter } from "next/navigation";

type BoardCardProps = {
  id: number;
  name: string;
  description?: string;
};

export default function BoardCard({ id, name, description }: BoardCardProps) {
  const router = useRouter();
  const openBoard = () => {
    router.replace(`/boards/${id}`);
  };

  return (
    <div
      onClick={openBoard}
      className="bg-white border dark:border-none rounded-md w-60 p-4 dark:bg-dark-3 hover:dark:bg-dark-2 hover:shadow cursor-pointer transition-colors"
    >
      <p className="dark:text-white">{name}</p>
      <p className="text-gray-500 dark:text-gray-300 mt-2">
        <small>{description || "description goes here"}</small>
      </p>
    </div>
  );
}
