"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PlusIcon } from "@radix-ui/react-icons";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { trpc } from "../../utils/trpc/trpc";
import openModal from "../../utils/openModal";
import BoardNameEditor from "../input/boardNameEditor/BoardNameEditor";
import { Button } from "../ui/button";
import CreateListModal from "./modals/CreateListModal";
import { useBoardContext } from "../../contexts/BoardContext";

type BoardProps = {
  board: {
    name: string;
    id: number;
  };
  list: ListProp;
  cards: CardProp;
};

export default function KanbanBoard(props: BoardProps) {
  const editMutation = trpc.lists.edit.useMutation();
  const createCardMutation = trpc.cards.create.useMutation();
  const { createList } = useBoardContext();

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

  const handleEditList = async (id: number, name: string) => {
    const updatedList = list.filter((list) => list.id !== id);
    const newListItem = await editMutation.mutateAsync({
      boardId,
      id,
      name,
    });
    updateList([...updatedList, newListItem]);
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

  const createNewButton = (
    <Button
      onClick={() =>
        openModal(
          <CreateListModal
            onSubmit={({ name }: { name: string }) =>
              createList({ boardId, name })
            }
          />
        )
      }
    >
      <PlusIcon className="mr-2" />
      Create New
    </Button>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <BoardNameEditor name={board.name} />
        {createNewButton}
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
