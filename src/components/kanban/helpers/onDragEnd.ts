import { trpc } from "@/utils/trpc/trpc";
import { DropResult } from "react-beautiful-dnd";
import { CardProp, ListProp } from "../types";
import { sortCards } from "./sort";

export default async function onDragEnd(
  boardId: string,
  result: DropResult,
  list: ListProp[] | []
) {
  const cards = list.map(({ id, name, cards }: any) => {});

  let { source, destination } = result;
  if (!destination) return;

  const cardUpdatePositionMutation = trpc.cards.updatePosition.useMutation();

  source.droppableId = source.droppableId.replace("list-", "");
  destination.droppableId = destination.droppableId.replace("list-", "");
  const draggableId: number = parseInt(result.draggableId.replace("card-", ""));

  const { index: sourceIndex } = source;
  const { index: destinationIndex } = destination;
  const sourceId: number = parseInt(source.droppableId);
  const destinationId: number = parseInt(destination.droppableId);

  let sourceCards = sortCards(
    cards.filter((card) => card?.listId === sourceId)
  ) as CardProp[];
  if (!sourceCards) return;

  const cardMoving = sourceCards.find((card) => draggableId === card?.id);
  if (!cardMoving) return;

  if (sourceId === destinationId) {
    if (sourceIndex === destinationIndex) return;

    // Remove the item from its current position
    sourceCards.splice(sourceIndex, 1);

    // Insert the item at the second position
    sourceCards.splice(destinationIndex, 0, cardMoving);

    // readjust the positions
    sourceCards = sourceCards.map((card, position) => ({
      ...card,
      position,
    })) as CardProp[];
    const restOfTheCards = cards.filter((card) => card?.listId !== sourceId);
    const newCards = [...restOfTheCards, ...sourceCards];
    // setCardsData(newCards);
    // setCards(newCards);

    await cardUpdatePositionMutation.mutate({ cards: newCards, boardId });
  } else {
    let destinationCards =
      sortCards(cards.filter((card) => card?.listId === destinationId)) || [];

    // Remove the item from its current position
    sourceCards.splice(sourceIndex, 1);

    // Insert the item at the second position
    destinationCards.splice(destinationIndex, 0, cardMoving);

    // readjust the positions
    sourceCards = sourceCards.map((card, position) => ({
      ...card,
      position,
    })) as CardProp[];
    destinationCards = destinationCards.map((card, position) => ({
      ...card,
      position,
      listId: destinationId,
    })) as CardProp[];

    const restOfTheCards = cards.filter((card) => {
      if (!(card && card?.listId)) return;
      return ![sourceId, destinationId].includes(card?.listId);
    });

    const newCards = [...restOfTheCards, ...sourceCards, ...destinationCards];
    await cardUpdatePositionMutation.mutate({ cards: newCards, boardId });
    // setCardsData(newCards);
    // setCards(newCards);
  }
}
