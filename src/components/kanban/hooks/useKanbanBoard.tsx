"use client";

import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { CardProp, ListProp } from "../types";
import { sortCards } from "../helpers/sort";

export default function useKanbanBoard(
  defaultList: ListProp[],
  defaultCards: CardProp[]
) {
  const [list, setList] = useState(defaultList || []);
  const [cards, setCards] = useState(defaultCards || []);

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
    let sourceCards = sortCards(cards).filter(
      (card) => card.listId === sourceId
    );
    if (!sourceCards) return;

    const cardMoving = sourceCards.find(
      (card) => source.index === card.position
    );
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
      setCards([...restOfTheCards, ...sourceCards]);
    } else {
      let destinationCards = sortCards(
        cards.filter((card) => card.listId === destinationId)
      );

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
      setCards(newCards);
    }
  };

  return { list, cards, onDragEnd };
}
