"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PlusIcon } from "@radix-ui/react-icons";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { trpc } from "../../utils/trpc/trpc";
import openModal from "../../utils/openModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import BoardNameEditor from "../input/boardNameEditor/BoardNameEditor";
import { Button } from "../ui/button";
import CreateListModal from "./modals/CreateListModal";

type BoardProps = {
  board: {
    name: string;
    id: number;
  };
  list: ListProp;
  cards: CardProp;
};

export default function KanbanBoard(props: BoardProps) {
  const createMutation = trpc.lists.create.useMutation();
  const editMutation = trpc.lists.edit.useMutation();
  const deleteMutation = trpc.lists.delete.useMutation();
  const createCardMutation = trpc.cards.create.useMutation();

  const {
    board,
    board: { id: boardId },
    list: defaultList,
    cards: defaultCards,
  } = props;

  let { list, cards, onDragEnd, updateList, updateCards } = useKanbanBoard(
    defaultList,
    defaultCards
  );

  useEffect(() => {
    updateList(defaultList);
  }, [defaultList]);

  const handleOnChange = async (result: DropResult) => {
    await onDragEnd(boardId, result);
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

  const handleDeleteList = (id: number) => {
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

  const handleOnCardCreate = async ({
    id,
    name,
  }: {
    id: number;
    name: string;
  }) => {
    const newCard = await createCardMutation.mutateAsync({
      boardId: boardId,
      listId: id,
      title: name,
    });

    updateCards([...cards, newCard]);
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
        <DragDropContext onDragEnd={handleOnChange}>
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
                        onDelete={() => handleDeleteList(id)}
                        onEdit={({ name: newName }: { name: string }) =>
                          handleEditList(id, newName)
                        }
                        onCardCreate={handleOnCardCreate}
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
