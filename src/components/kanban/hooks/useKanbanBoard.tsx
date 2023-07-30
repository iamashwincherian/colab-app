"use client";

import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { CardProp, ListProp } from "../types";
import { sortCards } from "../helpers/sort";
import { useBoardContext } from "../../../contexts/BoardContext";
import { trpc } from "../../../utils/trpc/trpc";

export default function useKanbanBoard(
  defaultList: ListProp,
  defaultCards: CardProp
) {
  const [list, setList] = useState<ListProp>(defaultList || []);
  const [cards, setCardsData] = useState<CardProp>(defaultCards || []);
  const cardUpdatePositionMutation = trpc.cards.updatePosition.useMutation();
  const { setCards } = useBoardContext();

  useEffect(() => {
    setList(defaultList);
    setCardsData(defaultCards);
  }, [defaultList, defaultCards]);

  const onDragEnd = async (boardId: number, result: DropResult) => {
    let { source, destination } = result;
    if (!destination) return;

    source.droppableId = source.droppableId.replace("list-", "");
    destination.droppableId = destination.droppableId.replace("list-", "");
    const draggableId: number = parseInt(
      result.draggableId.replace("card-", "")
    );

    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;
    const sourceId: number = parseInt(source.droppableId);
    const destinationId: number = parseInt(destination.droppableId);

    let sourceCards = sortCards(
      cards.filter((card) => card.listId === sourceId)
    );
    if (!sourceCards) return;

    const cardMoving = sourceCards.find((card) => draggableId === card.id);
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
      }));
      const restOfTheCards = cards.filter((card) => card.listId !== sourceId);
      const newCards = [...restOfTheCards, ...sourceCards];
      setCardsData(newCards);
      setCards(newCards);

      await cardUpdatePositionMutation.mutate({ cards: newCards, boardId });
    } else {
      let destinationCards =
        sortCards(cards.filter((card) => card.listId === destinationId)) || [];

      // Remove the item from its current position
      sourceCards.splice(sourceIndex, 1);

      // Insert the item at the second position
      destinationCards.splice(destinationIndex, 0, cardMoving);

      // readjust the positions
      sourceCards = sourceCards.map((card, position) => ({
        ...card,
        position,
      }));
      destinationCards = destinationCards.map((card, position) => ({
        ...card,
        position,
        listId: destinationId,
      }));

      const restOfTheCards = cards.filter(
        (card) => ![sourceId, destinationId].includes(card.listId)
      );

      const newCards = [...restOfTheCards, ...sourceCards, ...destinationCards];
      setCardsData(newCards);
      setCards(newCards);
      await cardUpdatePositionMutation.mutate({ cards: newCards, boardId });
    }
  };

  const updateList = (newList: []) => {
    setList([...newList]);
    return newList;
  };

  const updateCards = (newCards: CardProp[] = []) => {
    setCardsData([...newCards]);
    return newCards;
  };

  return { list, cards, onDragEnd, updateList, updateCards };
}
