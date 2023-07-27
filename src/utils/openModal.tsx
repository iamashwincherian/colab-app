"use client";

import React from "react";
import { createRoot } from "react-dom/client";
import ConfirmationModal from "../components/modals/ConfirmationModal";

export default function openModal(modal: any, props: object = {}) {
  const modalEl = document.getElementById("modalEl");
  if (!modalEl || !modal) return;

  const root = createRoot(modalEl);

  const onClose = () => {
    if (modalEl) {
      root.unmount();
    }
  };

  const getComponent = () => {
    return (
      <div className="modal">
        {(React.createElement("div", { open: true, ...props }), modal)}
      </div>
    );
  };

  root.render(getComponent());

  return onClose;
}
