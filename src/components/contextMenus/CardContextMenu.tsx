import { ReactNode } from "react";
import { useBoardContext } from "../../contexts/BoardContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type CardContextProps = {
  id: number;
  children: ReactNode;
};

export default function CardContextMenu({ id, children }: CardContextProps) {
  const { deleteCard } = useBoardContext();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="text-red-500"
          onClick={() => deleteCard(id)}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
