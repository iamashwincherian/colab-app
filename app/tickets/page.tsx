"use client";

import PageLayout from "../../components/layouts/PageLayout";
import MainContent from "../../components/layoutWrapper/MainContent";

import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../components/droppable/Droppable";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProtectedRoute from "../../components/authentication/ProtectedRoute";

const title = "Tickets";
const subtitle =
  "Efficiently organize and prioritize your issues to keep your team on track";

const ticketData = {
  columns: {
    "col-todo": {
      id: "col-todo",
      text: "Todo",
      ticketIds: ["ticket-0", "ticket-1"],
    },
    "col-inprogress": {
      id: "col-inprogress",
      text: "In progress",
      ticketIds: ["ticket-3"],
    },
    "col-done": {
      id: "col-done",
      text: "Done",
      ticketIds: ["ticket-2"],
    },
  },
  items: {
    "ticket-0": {
      id: "ticket-0",
      content: "Fix authentication",
    },
    "ticket-1": {
      id: "ticket-1",
      content: "Create user profile page",
    },
    "ticket-2": {
      id: "ticket-2",
      content: "Create a repo",
    },
    "ticket-3": {
      id: "ticket-2",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  },
  columnOrder: ["col-todo", "col-inprogress", "col-done"],
};

export default function Home() {
  const [tickets, setTickets] = useState(ticketData);
  const { columnOrder, columns, items } = tickets;

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destinationIndex, droppableId: destinationId } = destination;
    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    const sourceColumn = columns[sourceId];
    const sourceTicketIds = [...sourceColumn.ticketIds];
    sourceTicketIds.splice(sourceIndex, 1);

    if (sourceId === destinationId) {
      sourceTicketIds.splice(destinationIndex, 0, draggableId);
      setTickets({
        ...tickets,
        columns: {
          ...tickets.columns,
          [sourceId]: { ...sourceColumn, ticketIds: sourceTicketIds },
        },
      });
      return;
    }

    const destinationColumn = columns[destinationId];
    const destinationTicketIds = [...destinationColumn.ticketIds];
    destinationTicketIds.splice(destinationIndex, 0, draggableId);

    setTickets({
      ...tickets,
      columns: {
        ...columns,
        [sourceId]: { ...sourceColumn, ticketIds: sourceTicketIds },
        [destinationId]: {
          ...destinationColumn,
          ticketIds: destinationTicketIds,
        },
      },
    });
  };

  return (
    <ProtectedRoute>
      <PageLayout>
        <MainContent title={title} subtitle={subtitle}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex dark:text-white items-start">
              {columnOrder.map((colId: string) => {
                const column = columns[colId];

                return (
                  <div
                    key={colId}
                    className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md"
                  >
                    <div className="p-2 dark:shadow-xl px-3">{column.text}</div>
                    <StrictModeDroppable droppableId={colId}>
                      {(provided) => (
                        <div
                          className="mt-2"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div>
                            {column.ticketIds.map(
                              (ticketId: string, index: number) => (
                                <Draggable
                                  draggableId={ticketId}
                                  key={ticketId}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white shadow-sm dark:bg-dark-3 mx-3 p-4 rounded border dark:border-none dark:shadow-lg cursor-pointer mb-3"
                                    >
                                      {items[ticketId].content}
                                    </div>
                                  )}
                                </Draggable>
                              )
                            )}
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
              })}
            </div>
          </DragDropContext>
        </MainContent>
      </PageLayout>
    </ProtectedRoute>
  );
}
