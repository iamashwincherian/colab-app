"use client";

import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { CardProp, ListProp } from "../types";

export default function useKanbanBoard(
  defaultList: ListProp[],
  defaultCards: CardProp[]
) {
  const [list, setList] = useState(defaultList);
  const [cards, setCards] = useState(defaultCards);

  useEffect(() => {
    setList(defaultList);
    setCards(defaultCards);
  }, [defaultList, defaultCards]);

  const onDragEnd = (result: DropResult) => {
    let { source, destination, draggableId } = result;
    if (!destination) return;

    draggableId = draggableId.replace("card-", "");
    source.droppableId = source.droppableId.replace("list-", "");
    destination.droppableId = destination.droppableId.replace("list-", "");

    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destinationIndex, droppableId: destinationId } = destination;
    let sourceCards = cards.filter((card) => card.listId === sourceId);
    if (!sourceCards) return;

    if (sourceId === destinationId) {
      if (sourceIndex === destinationIndex) return;

      const cardToMove = sourceCards.find(
        (card) => card.position === sourceIndex
      );
      if (!cardToMove) return;

      // Remove the item from its current position
      sourceCards.splice(sourceIndex, 1);

      // Insert the item at the second position
      sourceCards.splice(destinationIndex, 0, cardToMove);

      // readjust the positions
      sourceCards = sourceCards.map((card, index) => ({ ...card, index }));
      const tempCards = cards.filter((card) => card.listId !== sourceId);
      setCards([...tempCards, ...sourceCards]);
    } else {
      let destinationCards = cards.filter(
        (card) => card.listId === destinationId
      );
      const cardToMove = sourceCards.find(
        (card) => card.position === sourceIndex
      );
      if (!cardToMove) return;

      // Remove the item from its current position
      sourceCards.splice(sourceIndex, 1);

      // Insert the item at the second position
      destinationCards.splice(destinationIndex, 0, cardToMove);

      // readjust the positions
      sourceCards = sourceCards.map((card, index) => ({ ...card, index }));
      destinationCards = destinationCards.map((card, index) => ({
        ...card,
        index,
        listId: destinationId,
      }));

      const tempCards = cards.filter(
        (card) => ![sourceId, destinationId].includes(card.listId)
      );

      const newCards = [...tempCards, ...sourceCards, ...destinationCards];
      setCards(newCards);
    }
  };

  return { list, cards, onDragEnd };
}
