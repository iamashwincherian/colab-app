import { PlusIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { StrictModeDroppable } from "../droppable/Droppable";
import Card from "./Card";
import { sortCards } from "./helpers/sort";
import openModal from "../../utils/openModal";
import EditListModal from "./modals/EditListModal";
import CreateCardModal from "./modals/CreateCardModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useBoardContext } from "../../contexts/BoardContext";
import { Card as CardType } from "@prisma/client";
import createCard from "@/services/boards/createCard";
import editList from "@/services/boards/editList";
import deleteList from "@/services/boards/deleteList";

const Menu = ({
  name,
  onDelete,
  onEdit,
}: {
  name: string;
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: Function;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            openModal(<EditListModal name={name} onSubmit={onEdit} />)
          }
        >
          <Pencil1Icon className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={onDelete}>
          <TrashIcon className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function List({ id, name, cards = [], boardId }: any) {
  const sortedCards = (sortCards(cards) as CardType[]) || [];

  const onDelete = () => {
    openModal(
      <ConfirmationModal
        open={true}
        message="Are you sure you want to delete this list?"
        description="Please note that all the cards in this list will also be deleted!"
        onSubmit={() => deleteList(id, true)}
      />
    );
  };

  const handleOnCardCreate = ({
    listId,
    title,
  }: {
    listId: number;
    title: string;
  }) => {
    createCard(title, listId, boardId);
  };

  return (
    <div className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md">
      <div className="flex justify-between items-center p-2 px-3">
        <p>{name}</p>
        <Menu
          name={name}
          onDelete={onDelete}
          onEdit={({ name }: { name: string }) =>
            editList({ name, listId: id })
          }
        />
      </div>
      <StrictModeDroppable droppableId={id.toString()}>
        {(provided) => (
          <div
            className="mt-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {sortedCards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  index={card.position}
                  title={card.title}
                />
              ))}
            </div>
            {provided.placeholder}
            <div
              onClick={() =>
                openModal(
                  <CreateCardModal listId={id} onSubmit={handleOnCardCreate} />
                )
              }
              className="flex justify-center w-full cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-dark-2 py-2 h dark:hover:bg-dark-3 rounded-b-md"
            >
              <PlusIcon className="w-5 h-5 [&>path]:stroke-[3]" />
            </div>
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
}
