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
          onClick={() => deleteCard(card.id)}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
