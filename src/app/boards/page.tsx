import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import BoardCard from "../boardsOld/components/BoardCard";
import { authenticateUser } from "@/utils/getUser";
import BoardsTopbar from "./BoardsTopbar";
import { db } from "@/server/db";
import { Board } from "@prisma/client";

const Boards = async () => {
  const user = await authenticateUser();
  const boards: Board[] = await db.board.findMany({
    where: { userId: user.id },
  });

  return (
    <FullScreenLayout nav>
      <BoardsTopbar>
        <div className="flex flex-wrap gap-8">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </BoardsTopbar>
    </FullScreenLayout>
  );
};

// export default withAuth(Boards);
export default Boards;
