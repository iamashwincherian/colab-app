import { Draggable } from "react-beautiful-dnd";
import CardContextMenu from "../contextMenus/CardContextMenu";

type CardProps = {
  id: number;
  title: string;
  index: number;
};

export default function Card({ id, title, index }: CardProps) {
  return (
    <Draggable draggableId={id.toString()} key={`card-${id}`} index={index}>
      {(provided) => (
        <CardContextMenu card={{ id, title }}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white dark:bg-zinc-800 shadow-sm mx-3 p-4 rounded border dark:shadow-lg cursor-pointer mb-3"
          >
            {title}
          </div>
        </CardContextMenu>
      )}
    </Draggable>
  );
}
