import BoardWrapper from "@/components/kanban/BoardWrapper";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import BoardService from "@/services/boards";
import { authenticateUser } from "@/utils/getUser";

type BoardProps = {
  params: { boardId: string };
};

export default async function BoardPage({ params: { boardId } }: BoardProps) {
  await authenticateUser();
  const board = await BoardService.getData(boardId);

  console.log("loaded");

  return (
    <FullScreenLayout nav>
      {board && (
        <BoardWrapper board={board}>
          <KanbanBoard board={board} />
        </BoardWrapper>
      )}
    </FullScreenLayout>
  );
}
