"use client";

import BoardContextMenu from "@/components/contextMenus/BoardContextMenu";
import { Board } from "@prisma/client";
import { useRouter } from "next/navigation";

type BoardCardProps = {
  board: Board;
};

export default function BoardCard({ board }: BoardCardProps) {
  const { id, name } = board;
  const router = useRouter();

  const openBoard = () => {
    router.replace(`/boards/${id}`);
  };

  return (
    <BoardContextMenu board={board}>
      <div
        onClick={openBoard}
        className="bg-white border dark:border-none rounded-md w-60 p-4 dark:bg-dark-3 hover:dark:bg-dark-2 hover:shadow cursor-pointer transition-colors"
      >
        <p className="dark:text-white">{name}</p>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          <small>Description goes here</small>
        </p>
      </div>
    </BoardContextMenu>
  );
}
