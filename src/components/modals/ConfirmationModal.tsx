import { useEffect, useState } from "react";

import PrimaryModal from "./PrimaryModal";

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

  const handleSubmit = () => {
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

  const handleOpenChange = (open: Boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  return (
    <PrimaryModal
      title={confirmationMessage}
      description={description}
      submitButton={{ label: submitButtonLabel, varient: "destructive" }}
      open={open}
      onClose={handleOpenChange}
      onSubmit={handleSubmit}
    />
  );
}
