import { List } from "@/types/board";
import { DropResult } from "react-beautiful-dnd";
import updateCardPosition from "./updateCardPosition";

export default async function onDragEnd(
  boardId: number,
  payload: DropResult,
  list: List[]
) {
  const { source, destination } = payload;
  if (!destination) return;

  const draggableId = parseInt(payload.draggableId);
  const sourceId = parseInt(source.droppableId);
  const destinationId = parseInt(destination.droppableId);
  const sourceIndex = source.index;
  const destinationIndex = destination.index;

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
    sourceCards = sourceCards.map((card, position) => ({ ...card, position }));

    // update source cards
    await updateCardPosition(sourceCards);
  } else {
    let destinationCards = list.find(
      (item) => item.boardId === boardId && item.id === destinationId
    )?.cards;
    if (!destinationCards) return;

    sourceCards.splice(sourceIndex, 1);
    destinationCards.splice(destinationIndex, 0, cardMoving);
    sourceCards = sourceCards.map((card, position) => ({ ...card, position }));
    destinationCards = destinationCards.map((card, position) => ({
      ...card,
      listId: destinationId,
      position,
    }));

    // update both source cards and destinationCards
    await updateCardPosition([...sourceCards, ...destinationCards]);
  }
}
