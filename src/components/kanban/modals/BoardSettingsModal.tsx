"use client";

import { useEffect, useState } from "react";
import PrimaryModal from "@/components/modals/PrimaryModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BoardProp } from "../types";

type BoardSettingsProps = {
  onSubmit: Function;
  board: BoardProp;
};

export default function BoardSettingsModal({
  board,
  onSubmit,
}: BoardSettingsProps) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(board?.name || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({});
  };

  return (
    <PrimaryModal
      open={open}
      title={"Board Settings"}
      submitButton={{ label: "Save", varient: "outline" }}
      cancelButton={{ label: "Delete Board", varient: "destructive" }}
      size="max-w-lg"
      onClose={() => setOpen(false)}
      onSubmit={handleSubmit}
    >
      <div className="items-center gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="my-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </PrimaryModal>
  );
}
