"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc/trpc";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import NewListForm from "./forms/newList";
import openModal from "../../utils/openModal";
import ConfirmationModal from "../modals/ConfirmationModal";

type BoardProps = {
  boardId: number;
  list: ListProp;
  cards: CardProp;
  onChange: Function;
};

export default function KanbanBoard(props: BoardProps) {
  const createMutation = trpc.lists.create.useMutation();
  const deleteMutation = trpc.lists.delete.useMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  const handleDelete = (id: number) => {
    const updatedList = list.filter((list) => list.id !== id);
    openModal(
      <ConfirmationModal
        open={true}
        message="Are you sure you want to delete this list?"
        description="Please note that all the cards in this list will also be deleted!"
        onSubmit={async () => {
          setOpenDeleteModal(false);
          await deleteMutation.mutateAsync({ id });
          updateList(updatedList);
        }}
      />
    );
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
                  <List
                    id={id}
                    key={id}
                    name={name}
                    cards={cardsInTheListItem}
                    onDelete={() => handleDelete(id)}
                  />
                );
              })
            : null)}
        <NewListForm onCreate={handleNewList} />
      </div>
    </DragDropContext>
  );
}
