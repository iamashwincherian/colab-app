"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PlusIcon } from "@heroicons/react/24/solid";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { trpc } from "../../utils/trpc/trpc";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";

type BoardProps = {
  boardId: number;
  list: ListProp;
  cards: CardProp;
  onChange: Function;
};

const NewList = ({ onCreate }: { onCreate: Function }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(name);
    setName("");
    setOpen(false);
  };

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) setName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <div className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border dark:border-none dark:bg-dark-2 rounded-md cursor-pointer">
          <div className="p-2 dark:shadow-xl px-3">Create a new List</div>
          <div className="flex justify-center w-full bg-gray-50 hover:bg-gray-100 dark:bg-dark-2 py-2 h dark:hover:bg-dark-3 rounded-b-md">
            <PlusIcon className="w-5 h-5 [&>path]:stroke-[3]" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new list?</DialogTitle>
            <DialogDescription>
              Streamline your workflow and stay organized by creating a new
              list!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <div className="items-center gap-4">
              <Label htmlFor="name">List Name</Label>
              <Input
                id="name"
                className="mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function KanbanBoard(props: BoardProps) {
  const createMutation = trpc.lists.create.useMutation();
  const deleteMutation = trpc.lists.delete.useMutation();

  const { boardId, list: defaultList, cards: defaultCards, onChange } = props;
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

  const handleNewList = async (name: string) => {
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

  const handleDelete = async (id: number) => {
    const updatedList = list.filter((list) => list.id !== id);
    await deleteMutation.mutateAsync({ id });
    updateList(updatedList);
  };

  return (
    <DragDropContext onDragEnd={handleChange}>
      <div className="flex dark:text-white items-start">
        {list &&
          (list?.length
            ? list.map(({ id, name }: any) => {
                const cardsInTheListItem = cards.filter(
                  (card) => card.listId === id
                );
                return (
                  <ContextMenu key={id}>
                    <ContextMenuTrigger>
                      <List
                        id={id}
                        key={id}
                        name={name}
                        cards={cardsInTheListItem}
                      />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => handleDelete(id)}
                        className="cursor-pointer"
                      >
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })
            : null)}
        <NewList onCreate={handleNewList} />
      </div>
    </DragDropContext>
  );
}
