import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function NewListForm({ onCreate }: { onCreate: Function }) {
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
        <div className="bg-gray-50 shadow-sm w-64 mr-4 text-left flex flex-col border-2 border-dotted dark:border-none dark:bg-dark-2 rounded-md cursor-pointer">
          <div className="flex items-center p-2 dark:shadow-xl px-3">
            <PlusIcon className="w-5 h-5 [&>path]:stroke-[3] mr-2" />
            Create a new List
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md outline-none ">
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
                required
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
}
