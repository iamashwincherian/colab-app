import { createRoot } from "react-dom/client";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Button, ButtonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ButtonType = {
  label: string;
  varient?: ButtonVariants;
  hidden?: boolean;
};

type ModalProps = {
  open?: boolean;
  title?: string;
  description?: string;
  submitButton?: ButtonType;
  cancelButton?: ButtonType;
  size?: ModalSize;
  onSubmit?: Function;
  onClose?: (open: Boolean) => void;
  children?: ReactNode | string;
};

type ModalSize = "max-w-md" | "max-w-lg" | "max-w-xl" | "max-w-2xl";

const PrimaryModal = (props: ModalProps) => {
  const {
    title = "",
    description = "",
    onClose = undefined,
    submitButton = {
      label: "Submit",
      varient: "default",
      hidden: false,
    },
    cancelButton = {
      label: "Cancel",
      varient: "outline",
      hidden: false,
    },
    size = "max-w-md",
    onSubmit,
    children,
  } = props;

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    const modal = document.getElementById("modalEl");
    if (open === false) {
      if (!modal) return;
      const root = createRoot(modal);
      root.unmount();
    }
  }, [open]);

  const handleOnOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value && onClose) onClose(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className={size as string}>
        <form onSubmit={handleSubmit} className="grid gap-4 my-2">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="mt-4">
            {!cancelButton.hidden && (
              <Button
                type="reset"
                variant={cancelButton.varient}
                onClick={() => handleOnOpenChange(false)}
              >
                {cancelButton.label}
              </Button>
            )}
            {!submitButton.hidden && (
              <Button type="submit" variant={submitButton.varient}>
                {submitButton.label}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrimaryModal;
