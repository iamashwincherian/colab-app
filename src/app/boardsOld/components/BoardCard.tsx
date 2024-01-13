"use client";

import BoardContextMenu from "@/components/contextMenus/BoardContextMenu";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card onClick={openBoard} className="cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Description goes here</CardDescription>
        </CardHeader>
      </Card>
    </BoardContextMenu>
  );
}
