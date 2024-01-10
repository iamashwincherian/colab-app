import KanbanBoard from "@/components/kanban/KanbanBoardV2";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import BoardService from "@/services/boards";
import { authenticateUser } from "@/utils/getUser";

type BoardProps = {
  params: { boardId: string };
};

export default async function BoardPage({ params: { boardId } }: BoardProps) {
  await authenticateUser();
  const board = await BoardService.getData(boardId);

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        <div>{board?.name}</div>
        {board && <KanbanBoard board={board} />}
      </div>
    </FullScreenLayout>
  );
}
