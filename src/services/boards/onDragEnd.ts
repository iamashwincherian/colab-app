import { List } from "@/types/board";
import { DropResult } from "react-beautiful-dnd";
import updateCardPosition from "./updateCardPosition";
import updateListPosition from "./updateListPosition";

export type DraggableType = "list" | "card";

export interface DropResultType extends DropResult {
  type: DraggableType;
}

export default async function onDragEnd(
  boardId: number,
  payload: DropResultType,
  list: List[]
) {
  const { source, destination, type } = payload;
  if (!destination) return;

  const draggableId = parseInt(payload.draggableId);
  const sourceIndex = source.index;
  const destinationIndex = destination.index;
  const sourceId = parseInt(source.droppableId);
  const destinationId = parseInt(destination.droppableId);

  if (type === "card") {
    let sourceCards = list.find(
      (item) => item.boardId === boardId && item.id === sourceId
    )?.cards;
    if (!sourceCards) return;

    const cardMoving = sourceCards.find((item) => item.id === draggableId);
    if (!cardMoving) return;

    if (sourceId === destinationId) {
      if (sourceIndex === destinationIndex) return;

      sourceCards.splice(sourceIndex, 1);
      sourceCards.splice(destinationIndex, 0, cardMoving);
      sourceCards = sourceCards.map((card, position) => ({
        ...card,
        position,
      }));

      await updateCardPosition(sourceCards, boardId);
    } else {
      let destinationCards = list.find(
        (item) => item.boardId === boardId && item.id === destinationId
      )?.cards;
      if (!destinationCards) return;

      sourceCards.splice(sourceIndex, 1);
      destinationCards.splice(destinationIndex, 0, cardMoving);
      sourceCards = sourceCards.map((card, position) => ({
        ...card,
        position,
      }));
      destinationCards = destinationCards.map((card, position) => ({
        ...card,
        listId: destinationId,
        position,
      }));

      await updateCardPosition([...sourceCards, ...destinationCards], boardId);
    }
  } else if (type === "list") {
    if (sourceIndex === destinationIndex) return;

    const listMoving = list.find((item) => item.id === draggableId);
    if (!listMoving) return;

    list.splice(sourceIndex, 1);
    list.splice(destinationIndex, 0, listMoving);
    const updatedList = list.map((listItem, position) => ({
      ...listItem,
      position,
    }));

    await updateListPosition(updatedList, boardId);
  }
}
