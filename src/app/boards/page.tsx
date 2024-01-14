import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import BoardCard from "./components/BoardCard";
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
        <div>
          <div className="flex flex-wrap gap-8">
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
          {boards.length === 0 && (
            <div className="flex items-center justify-center w-full h-[70vh] text-muted-foreground">
              There are no boards. Create one to get started.
            </div>
          )}
        </div>
      </BoardsTopbar>
    </FullScreenLayout>
  );
};

// export default withAuth(Boards);
export default Boards;
