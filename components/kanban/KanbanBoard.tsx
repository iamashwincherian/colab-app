"use client";

import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { useUserContext } from "../../contexts/UserContext";
import List from "./List";
import data from "./data";

type KanbanBoardProps = {
  data: object;
};

type ListProp = {
  [id: string]: {
    id: string;
    text: string;
    cardIds: string[];
  };
};

type CardProp = {
  [id: string]: {
    id: string;
    text: string;
  };
};

export default function KanbanBoard() {
  const boardId = 1;
  const [list, setList] = useState<ListProp>(data.list);
  const [cards, setCards] = useState<CardProp>(data.cards);
  const [listOrder, setListOrder] = useState<string[]>(data.listOrder || []);

  const populateListAndCards = (listProps: [], cardProps: []) => {
    const findCards = (listId: number) => {
      return cardProps
        .filter((cardItem) => cardItem.list === listId)
        .map((cardItem) => cardItem.id);
    };

    const newList: ListProp = {};
    const newListOrder: number[] = [];
    listProps.forEach(({ id, name }: { id: number; name: string }) => {
      newList[id] = {
        id,
        name,
        cardIds: findCards(id),
      };
      newListOrder.push(id);
    });
    setList(newList);
    setListOrder(newListOrder);

    const newCards: CardProp = {};
    cardProps.forEach(({ id, name }: { id: number; name: string }) => {
      newCards[id] = {
        id,
        name,
      };
    });
    setCards(newCards);
  };

  const onDragEnd = (result: any) => {
    let { source, destination, draggableId } = result;
    if (!destination) return;

    draggableId = draggableId.replace("card-", "");
    source.droppableId = source.droppableId.replace("list-", "");
    destination.droppableId = destination.droppableId.replace("list-", "");

    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destinationIndex, droppableId: destinationId } = destination;
    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    const sourceColumn = list[sourceId];
    const sourceTicketIds = [...sourceColumn.cardIds];
    sourceTicketIds.splice(sourceIndex, 1);

    if (sourceId === destinationId) {
      sourceTicketIds.splice(destinationIndex, 0, draggableId);

      setList({
        ...list,
        [sourceId]: { ...sourceColumn, cardIds: sourceTicketIds },
      });
      return;
    }

    const destinationColumn = list[destinationId];
    const destinationTicketIds = [...destinationColumn.cardIds];
    destinationTicketIds.splice(destinationIndex, 0, draggableId);

    setList({
      ...list,
      [sourceId]: { ...sourceColumn, cardIds: sourceTicketIds },
      [destinationId]: { ...destinationColumn, cardIds: destinationTicketIds },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex dark:text-white items-start">
        {Object.keys(list).length &&
          listOrder.map((listId: string, index: number) => (
            <List key={index} id={listId} item={list[listId]} cards={cards} />
          ))}
      </div>
    </DragDropContext>
  );
}
