import { Draggable } from "react-beautiful-dnd";

type CardProps = {
  id: string;
  text: string | undefined;
  index: number;
};

export default function Card({ id, text, index }: CardProps) {
  return (
    <Draggable draggableId={`card-${id}`} key={`card-${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white shadow-sm dark:bg-dark-3 mx-3 p-4 rounded border dark:border-none dark:shadow-lg cursor-pointer mb-3"
        >
          {text}
        </div>
      )}
    </Draggable>
  );
}
