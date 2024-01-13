import { useState } from "react";

import PrimaryModal from "../../modals/PrimaryModal";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const CreateBoardModal = ({ onSubmit }: { onSubmit: Function }) => {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const [createSample, setCreateSample] = useState<boolean>(true);

  const title = "Create a new Board";
  const description =
    "Streamline your workflow and stay organized by adding a new Board!";

  const handleSubmit = () => {
    setOpen(false);
    onSubmit({ name, createSample });
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
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />
        <div className="items-top flex space-x-2 mt-4 items-center">
          <Checkbox
            id="create-sample-checkbox"
            checked={createSample}
            onCheckedChange={() => setCreateSample(!createSample)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="create-sample-checkbox"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create sample data
            </label>
          </div>
        </div>
      </div>
    </PrimaryModal>
  );
};

export default CreateBoardModal;
