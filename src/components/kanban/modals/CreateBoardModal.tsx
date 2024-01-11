import { useState } from "react";

import PrimaryModal from "../../modals/PrimaryModal";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const CreateBoardModal = ({ onSubmit }: { onSubmit: Function }) => {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);

  const title = "Create a new Board";
  const description =
    "Streamline your workflow and stay organized by adding a new Board!";

  const handleSubmit = () => {
    setOpen(false);
    onSubmit({ name, createSample: true });
  };

  return (
    <PrimaryModal
      open={open}
      title={title}
      description={description}
      submitButton={{ label: "Create" }}
      onClose={() => setOpen(false)}
      onSubmit={handleSubmit}
    >
      <div className="items-center gap-4">
        <Label htmlFor="name">Board Title</Label>
        <Input
          className="mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
    </PrimaryModal>
  );
};

export default CreateBoardModal;
