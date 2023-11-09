import BoardNameEditor from "@/components/input/boardNameEditor/BoardNameEditor";
import KanbanBoard from "@/components/kanban/KanbanBoardV2";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import getBoardData from "@/services/boards/getBoardData";
import { authenticateUser } from "@/utils/getUser";

type BoardProps = {
  params: { boardId: string };
};

export default async function BoardPage({ params: { boardId } }: BoardProps) {
  const user = await authenticateUser();
  const board = await getBoardData(boardId);

  console.log("boards", board);

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        <div>
          {"board.name"} {user?.email}
        </div>
        {board && <KanbanBoard id={boardId} board={board} />}
      </div>
    </FullScreenLayout>
  );
}
