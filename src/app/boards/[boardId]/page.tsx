import BoardWrapper from "@/components/kanban/BoardWrapper";
import KanbanBoard from "@/components/kanban/KanbanBoardV2";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import MainContent from "@/components/layoutWrapper/MainContent";
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
      {board && (
        <BoardWrapper board={board}>
          <KanbanBoard board={board} />
        </BoardWrapper>
      )}
    </FullScreenLayout>
  );
}
