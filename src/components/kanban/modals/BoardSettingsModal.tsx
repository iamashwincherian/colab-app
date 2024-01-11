"use client";

import { useState } from "react";
import PrimaryModal from "@/components/modals/PrimaryModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import deleteBoard from "@/services/boards/deleteBoard";
import { Board } from "@prisma/client";

type BoardSettingsProps = {
  onSubmit: Function;
  onDelete?: Function;
  board: Board;
};

export default function BoardSettingsModal({
  board,
  onSubmit,
  onDelete,
}: BoardSettingsProps) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(board?.name || "");

  const handleSubmit = () => {
    onSubmit({ name, boardId: board.id });
    setOpen(false);
  };

  return (
    <PrimaryModal
      open={open}
      title={"Board Settings"}
      submitButton={{ label: "Save", varient: "outline" }}
      cancelButton={{
        label: "Delete Board",
        varient: "destructive",
        onClick: onDelete,
      }}
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
