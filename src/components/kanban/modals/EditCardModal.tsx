import { useState } from "react";

import PrimaryModal from "../../modals/PrimaryModal";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const EditCardModal = ({
  title: cardTitle,
  onSubmit,
}: {
  title: string;
  onSubmit: Function;
}) => {
  const [title, setTitle] = useState<string>(cardTitle);
  const [open, setOpen] = useState<boolean>(true);

  const handleSubmit = () => {
    setOpen(false);
    onSubmit({ title });
  };

  return (
    <PrimaryModal
      open={open}
      title={"Edit Card"}
      submitButton={{ label: "Edit" }}
      onClose={() => setOpen(false)}
      onSubmit={handleSubmit}
    >
      <div className="items-center gap-4">
        <Label htmlFor="title">Card Title</Label>
        <Input
          id="title"
          className="mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
    </PrimaryModal>
  );
};

export default EditCardModal;
