import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import BoardCard from "../boardsOld/components/BoardCard";
import withAuth from "../../utils/withAuth";
import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { User } from "@prisma/client";
import BoardsTopbar from "./BoardsTopbar";

const Boards = async () => {
  // const { data, status } = trpc.boards.all.useQuery();
  // const createBoardMutation = trpc.boards.create.useMutation();
  // const [boards, setBoards] = useState([]);
  const user = await authenticateUser();
  const boards = await db.board.findMany({ where: { userId: user.id } });

  // useEffect(() => {
  //   if (status === "success") {
  //     setBoards(data);
  //   }
  // }, [status]);

  // const handleCreateBoard = () => {
  //   openModal(
  //     <CreateBoardModal
  //       onSubmit={async ({ name }: { name: string }) => {
  //         const newBoard = await createBoardMutation.mutateAsync({
  //           name,
  //           createSample: true,
  //         });
  //         setBoards([...boards, newBoard]);
  //       }}
  //     />
  //   );
  // };

  return (
    <FullScreenLayout nav>
      <BoardsTopbar>
        <div className="flex flex-wrap gap-8">
          {boards.map(({ id, name }) => (
            <BoardCard key={id} id={id} name={name} />
          ))}
        </div>
      </BoardsTopbar>
    </FullScreenLayout>
  );
};

// export default withAuth(Boards);
export default Boards;
