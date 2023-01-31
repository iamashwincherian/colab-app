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
  columns: {
    "col-todo": {
      id: "col-todo",
      text: "Todo",
      ticketIds: ["ticket-0", "ticket-1"],
    },
    "col-inprogress": {
      id: "col-inprogress",
      text: "In progress",
      ticketIds: [],
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
  },
  columnOrder: ["col-todo", "col-inprogress", "col-done"],
};

export default function Home() {
  const [tickets, setTickets] = useState(ticketData);
  const { columnOrder, columns, items } = tickets;

  const onDragEnd = (result: any) => {
    const {
      source: { index: sourceIndex, droppableId: sourceId },
      destination: { index: destinationIndex, droppableId: destinationId },
      draggableId,
    } = result;
    if (!result.destination) return;
    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    const sourceColumn = columns[sourceId];
    const destinationColumn = columns[destinationId];
    const sourceTicketIds = [...sourceColumn.ticketIds];
    sourceTicketIds.splice(sourceIndex, 1);

    if (sourceColumn === destinationColumn) {
      sourceTicketIds.splice(destinationIndex, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        ticketIds: sourceTicketIds,
      };
      setTickets({
        ...tickets,
        columns: {
          ...tickets.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const newSourceColumn = {
      ...sourceColumn,
      ticketIds: sourceTicketIds,
    };

    const destinationTicketIds = [...destinationColumn.ticketIds];
    destinationTicketIds.splice(destinationIndex, 0, draggableId);

    const newDestinationColumn = {
      ...destinationColumn,
      ticketIds: destinationTicketIds,
    };

    setTickets({
      ...tickets,
      columns: {
        ...columns,
        [sourceColumn.id]: newSourceColumn,
        [destinationColumn.id]: newDestinationColumn,
      },
    });
  };

  return (
    <PageLayout>
      <MainContent title={title} subtitle={subtitle}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex dark:text-white items-start dark:shadow">
            {columnOrder.map((colId: string) => {
              const column = columns[colId];

              return (
                <div
                  key={colId}
                  className="w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md"
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
                                    className="dark:bg-dark-3 mx-3 p-4 rounded border dark:border-none dark:shadow-lg cursor-pointer mb-3"
                                  >
                                    {items[ticketId].content}
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {!column.ticketIds.length && (
                            <div className="py-2"></div>
                          )}
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
