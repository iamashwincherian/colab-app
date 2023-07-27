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
import { Button } from "../ui/button";

type ConfirmationProps = {
  open: boolean;
  message?: string;
  buttonLabel?: string;
  description?: string;
  onSubmit?: Function;
  onCancel?: Function;
};

export default function ConfirmationModal(props: ConfirmationProps) {
  const {
    message = null,
    buttonLabel = null,
    description = "",
    onSubmit,
    onCancel,
  } = props;
  const [open, setOpen] = useState(props.open || false);
  const confirmationMessage = message || "Are you sure?";
  const submitButtonLabel = buttonLabel || "Yes";

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      handleCancel();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit} onReset={handleCancel}>
          <DialogHeader>
            <DialogTitle>{confirmationMessage}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              {submitButtonLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
