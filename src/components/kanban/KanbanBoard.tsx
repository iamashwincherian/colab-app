"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PlusIcon } from "@heroicons/react/24/solid";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc/trpc";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import NewListForm from "./forms/newList";

type BoardProps = {
  boardId: number;
  list: ListProp;
  cards: CardProp;
  onChange: Function;
};

export default function KanbanBoard(props: BoardProps) {
  const createMutation = trpc.lists.create.useMutation();
  const deleteMutation = trpc.lists.delete.useMutation();

  const { boardId, list: defaultList, cards: defaultCards, onChange } = props;
  let { list, cards, onDragEnd, updateList } = useKanbanBoard(
    defaultList,
    defaultCards
  );

  useEffect(() => {
    updateList(defaultList);
  }, [defaultList]);

  const handleChange = (payload: DropResult) => {
    const result = onDragEnd(payload);
    onChange(result);
  };

  const handleNewList = async (name: string) => {
    const latestPosition = list.reduce(
      (max: number, item) => Math.max(max, item.position),
      1
    );
    const newListItem = await createMutation.mutateAsync({
      boardId,
      name,
      position: latestPosition,
    });
    updateList([...list, newListItem]);
  };

  const handleDelete = async (id: number) => {
    const updatedList = list.filter((list) => list.id !== id);
    await deleteMutation.mutateAsync({ id });
    updateList(updatedList);
  };

  return (
    <DragDropContext onDragEnd={handleChange}>
      <div className="flex dark:text-white items-start">
        {list &&
          (list?.length
            ? list.map(({ id, name }: any) => {
                const cardsInTheListItem = cards.filter(
                  (card) => card.listId === id
                );
                return (
                  <ContextMenu key={id}>
                    <ContextMenuTrigger>
                      <List
                        id={id}
                        key={id}
                        name={name}
                        cards={cardsInTheListItem}
                      />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => handleDelete(id)}
                        className="cursor-pointer"
                      >
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })
            : null)}
        <NewListForm onCreate={handleNewList} />
      </div>
    </DragDropContext>
  );
}
