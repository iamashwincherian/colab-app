import { PlusIcon } from "@heroicons/react/24/solid";

import { StrictModeDroppable } from "../droppable/Droppable";
import Card from "./Card";
import { sortCards } from "./helpers/sort";
import { ListProp } from "./types";

export default function List({ id, title, cards = [] }: ListProp) {
  const sortedCards = sortCards(cards);

  return (
    <div className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md">
      <div className="p-2 dark:shadow-xl px-3">{title}</div>
      <StrictModeDroppable droppableId={`list-${id}`}>
        {(provided) => (
          <div
            className="mt-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {sortedCards.map(({ id: cardId, text }, index) => (
                <Card key={cardId} id={cardId} index={index} text={text} />
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
