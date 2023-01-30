"use client";

import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";

import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../components/droppable/droppable";
import { useState } from "react";

const title = "Tickets";
const subtitle =
  "Efficiently organize and prioritize your issues to keep your team on track";

const ticketData = {
  columns: [
    { id: "col-id-todo", text: "Todo" },
    { id: "col-id-inprogress", text: "In progress" },
    { id: "col-id-done", text: "Done" },
  ],
  items: [
    { id: "item-id-0", column: "col-id-todo", content: "Fix authentication" },
    {
      id: "item-id-1",
      column: "col-id-todo",
      content: "Create user profile page",
    },
    { id: "item-id-2", column: "col-id-done", content: "Create a repo" },
  ],
};

export default function Home() {
  const [tickets, setTickets] = useState(ticketData);

  const onDragEnd = (result: any) => {
    const {
      source: { index: sourceIndex, droppableId: sourceId },
      destination: { index: destinationIndex, droppableId: destinationId },
    } = result;

    if (result.destination) return;

    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    const updatedTickets = [...tickets.items];
    const itemToMove = updatedTickets.splice(sourceIndex, 1)[0];
    updatedTickets
      .filter((ticket) => ticket.id === sourceId)
      .splice(destinationIndex, 0, itemToMove);

    setTickets({ ...tickets, items: [...tickets.items, ...updatedTickets] });
    console.log(result);
  };

  return (
    <PageLayout>
      <MainContent title={title} subtitle={subtitle}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex dark:text-white items-start dark:shadow">
            {tickets.columns.map((col) => {
              const colItems = tickets.items.filter(
                (item) => item.column === col.id
              );

              return (
                <div
                  key={col.id}
                  className="w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md"
                >
                  <div className="p-2 dark:shadow-xl px-3">{col.text}</div>
                  <StrictModeDroppable droppableId={col.id}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="pt-2">
                          {colItems.map((item, index) => (
                            <Draggable
                              draggableId={item.id}
                              key={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="dark:bg-dark-3 mx-3 p-4 rounded border dark:border-none dark:shadow-lg cursor-pointer mb-3"
                                >
                                  {item.content}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {!colItems.length && <div className="py-2"></div>}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </StrictModeDroppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </MainContent>
    </PageLayout>
  );
}
