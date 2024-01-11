import { ReactNode } from "react";
import openModal from "../../utils/openModal";
import EditCardModal from "../kanban/modals/EditCardModal";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import deleteCard from "@/services/boards/deleteCard";
import editCard from "@/services/boards/editCard";
import ConfirmationModal from "../modals/ConfirmationModal";

type CardContextProps = {
  card: {
    id: number;
    title: string;
  };
  children: ReactNode;
};

export default function CardContextMenu({ card, children }: CardContextProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() =>
            openModal(
              <EditCardModal
                onSubmit={({ title }: { title: string }) =>
                  editCard({ title, cardId: card.id })
                }
                title={card.title}
              />
            )
          }
        >
          Edit
        </ContextMenuItem>
        <ContextMenuItem
          className="text-red-500"
          onClick={() =>
            openModal(
              <ConfirmationModal
                open={true}
                message="Are you sure you want to delete this card?"
                description="Please note that you cannot undo this!"
                onSubmit={() => deleteCard(card.id)}
              />
            )
          }
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
