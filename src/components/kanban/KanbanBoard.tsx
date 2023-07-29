"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc/trpc";
import NewListForm from "./components/CreateListForm";
import openModal from "../../utils/openModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import BoardNameEditor from "../input/boardNameEditor/BoardNameEditor";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateListForm from "./components/CreateListForm";
import CreateListModal from "./modals/CreateListModal";

type BoardProps = {
  board: {
    name: string;
    id: number;
  };
  list: ListProp;
  cards: CardProp;
  onChange: Function;
};

export default function KanbanBoard(props: BoardProps) {
  const createMutation = trpc.lists.create.useMutation();
  const editMutation = trpc.lists.edit.useMutation();
  const deleteMutation = trpc.lists.delete.useMutation();

  const {
    board,
    board: { id: boardId },
    list: defaultList,
    cards: defaultCards,
    onChange,
  } = props;

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

  const handleNewList = async ({ name }: { name: string }) => {
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

  const handleEditList = async (id: number, name: string) => {
    const updatedList = list.filter((list) => list.id !== id);
    const newListItem = await editMutation.mutateAsync({
      boardId,
      id,
      name,
    });
    updateList([...updatedList, newListItem]);
  };

  const handleDelete = (id: number) => {
    const updatedList = list.filter((list) => list.id !== id);
    openModal(
      <ConfirmationModal
        open={true}
        message="Are you sure you want to delete this list?"
        description="Please note that all the cards in this list will also be deleted!"
        onSubmit={async () => {
          await deleteMutation.mutateAsync({ id });
          updateList(updatedList);
        }}
      />
    );
  };

  const createNewButton = () => (
    <Button
      onClick={() => openModal(<CreateListModal onSubmit={handleNewList} />)}
    >
      <PlusIcon className="mr-2" />
      Create New
    </Button>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <BoardNameEditor name={board.name} />
        {createNewButton()}
      </div>
      <div className="mt-6">
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
                        onEdit={({ name: newName }: { name: string }) =>
                          handleEditList(id, newName)
                        }
                      />
                    );
                  })
                : null)}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
