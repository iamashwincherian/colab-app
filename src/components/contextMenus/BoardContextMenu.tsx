import deleteBoard from "@/services/boards/deleteBoard";
import editBoard from "@/services/boards/editBoard";
import openModal from "@/utils/openModal";
import { Board } from "@prisma/client";
import BoardSettingsModal from "../kanban/modals/BoardSettingsModal";
import EditCardModal from "../kanban/modals/EditCardModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type CardContextProps = {
  board: Board;
  children: React.ReactNode;
};

export default function BoardContextMenu({
  board,
  children,
}: CardContextProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() =>
            openModal(<BoardSettingsModal board={board} onSubmit={editBoard} />)
          }
        >
          Edit
        </ContextMenuItem>
        <ContextMenuItem
          className="text-red-500"
          onClick={() => {
            openModal(
              <ConfirmationModal
                open={true}
                message="Are you sure you want to delete this board?"
                description="Please note that you cannot undo this!"
                onSubmit={() => deleteBoard(board.id)}
              />
            );
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
