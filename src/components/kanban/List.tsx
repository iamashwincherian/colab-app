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
import { Card as CardType } from "@prisma/client";
import createCard from "@/services/boards/createCard";
import editList from "@/services/boards/editList";
import deleteList from "@/services/boards/deleteList";
import { Draggable } from "react-beautiful-dnd";
import { useToast } from "../ui/toast/use-toast";

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

export default function List({ id, name, index, cards = [], boardId }: any) {
  const sortedCards = (sortCards(cards) as CardType[]) || [];
  const { toast } = useToast();

  const onDelete = () => {
    openModal(
      <ConfirmationModal
        open={true}
        message="Are you sure you want to delete this list?"
        description="Please note that all the cards in this list will also be deleted!"
        onSubmit={() =>
          deleteList(id, true).then(() =>
            toast({ description: "Deleted list successfully!" })
          )
        }
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
    createCard(title, listId, boardId).then(() => {
      toast({
        description: "Created new card successfully!",
      });
    });
  };

  return (
    <Draggable draggableId={`list-${id}`} key={`list-${id}`} index={index}>
      {(provided) => (
        <div
          className="h-full select-none mr-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="bg-gray-50 shadow-sm w-64 text-left flex flex-col border dark:border-none dark:bg-zinc-900 rounded-md"
            {...provided.dragHandleProps}
          >
            <div className="flex justify-between items-center p-2 px-3">
              <p>{name}</p>
              <Menu
                name={name}
                onDelete={onDelete}
                onEdit={({ name }: { name: string }) =>
                  editList({ name, listId: id }).then(() =>
                    toast({ description: "Updated list successfully!" })
                  )
                }
              />
            </div>
            <StrictModeDroppable droppableId={`card-${id}`} type="card">
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
                        <CreateCardModal
                          listId={id}
                          onSubmit={handleOnCardCreate}
                        />
                      )
                    }
                    className="flex justify-center w-full cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900 py-2 h dark:hover:bg-zinc-800 rounded-b-md"
                  >
                    <PlusIcon className="w-5 h-5 [&>path]:stroke-[3]" />
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}
