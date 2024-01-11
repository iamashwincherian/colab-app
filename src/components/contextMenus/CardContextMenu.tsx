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
import { useToast } from "../ui/toast/use-toast";

type CardContextProps = {
  card: {
    id: number;
    title: string;
  };
  children: ReactNode;
};

export default function CardContextMenu({ card, children }: CardContextProps) {
  const { toast } = useToast();
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() =>
            openModal(
              <EditCardModal
                onSubmit={({ title }: { title: string }) =>
                  editCard({ title, cardId: card.id }).then(() =>
                    toast({ description: "Updated card successfully!" })
                  )
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
                onSubmit={() =>
                  deleteCard(card.id).then(() =>
                    toast({ description: "Deleted card successfully!" })
                  )
                }
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
