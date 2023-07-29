import { useState } from "react";

import PrimaryModal from "../../modals/PrimaryModal";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const EditListModal = ({
  name: listName,
  onSubmit,
}: {
  name: string;
  onSubmit: Function;
}) => {
  const [name, setName] = useState<string>(listName);
  const [open, setOpen] = useState<boolean>(true);

  const handleSubmit = () => {
    setOpen(false);
    onSubmit({ name });
  };

  return (
    <PrimaryModal
      open={open}
      title={"Edit List"}
      submitButton={{ label: "Edit" }}
      onClose={() => setOpen(false)}
      onSubmit={handleSubmit}
    >
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
    </PrimaryModal>
  );
};

export default EditListModal;
