import { ReactNode } from "react";
import { useBoardContext } from "../../contexts/BoardContext";
import openModal from "../../utils/openModal";
import EditCardModal from "../kanban/modals/EditCardModal";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type CardContextProps = {
  card: {
    id: number;
    title: string;
  };
  children: ReactNode;
};

export default function CardContextMenu({ card, children }: CardContextProps) {
  const { updateCard, deleteCard } = useBoardContext();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() =>
            openModal(
              <EditCardModal
                onSubmit={({ title }: { title: string }) =>
                  updateCard({ title, cardId: card.id })
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
