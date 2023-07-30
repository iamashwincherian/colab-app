import { useState } from "react";

import PrimaryModal from "../../modals/PrimaryModal";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const CreateCardModal = ({
  id,
  onSubmit,
}: {
  id: number;
  onSubmit: Function;
}) => {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);

  const title = "Create a new Card";
  const description =
    "Streamline your workflow and stay organized by adding a new Card!";

  const handleSubmit = () => {
    setOpen(false);
    onSubmit({ id, name });
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
        <Label htmlFor="name">Card Title</Label>
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

export default CreateCardModal;
