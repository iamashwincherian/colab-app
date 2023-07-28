import { PlusIcon } from "@heroicons/react/24/solid";

import { StrictModeDroppable } from "../droppable/Droppable";
import Card from "./Card";
import { sortCards } from "./helpers/sort";
import {
  DotsHorizontalIcon,
  DropdownMenuIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MouseEventHandler, useState } from "react";
import openModal from "../../utils/openModal";
import PrimaryModal from "../modals/PrimaryModal";

const Menu = ({
  onDelete,
}: {
  onDelete: MouseEventHandler<HTMLDivElement>;
}) => {
  const openEditModal = () => {
    openModal(
      <PrimaryModal title="Hello" description="Welcome to colab">
        Hello
      </PrimaryModal>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openEditModal}>
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

export default function List({ id, name, cards = [], onDelete }: any) {
  const sortedCards = sortCards(cards) || [];

  return (
    <div className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md">
      <div className="flex justify-between items-center p-2 px-3">
        <p>{name}</p>
        <Menu onDelete={onDelete} />
      </div>
      <StrictModeDroppable droppableId={`list-${id}`}>
        {(provided) => (
          <div
            className="mt-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {sortedCards.map(({ id: cardId, title }, index) => (
                <Card key={cardId} id={cardId} index={index} title={title} />
              ))}
            </div>
            {provided.placeholder}
            <div className="flex justify-center w-full cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-dark-2 py-2 h dark:hover:bg-dark-3 rounded-b-md">
              <PlusIcon className="w-5 h-5 [&>path]:stroke-[3]" />
            </div>
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
}
