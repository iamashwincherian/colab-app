"use client";

import { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function BoardNameEditor({
  name: savedBoardName,
}: {
  name: string | undefined;
}) {
  const placeholder = "Enter board name";
  const [boardName, setBoardName] = useState(savedBoardName || "");
  const [showEditIcon, setShowEditIcon] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setBoardName(value);
  };

  const toggleEditIcon = (toggle: boolean) => {
    setShowEditIcon(toggle);
  };

  useEffect(() => {
    if (inputRef.current) {
      const length = boardName.length || placeholder.length;
      inputRef.current.style.width = `${length + 1}ch`;
    }
  }, [boardName]);

  useEffect(() => {
    if (savedBoardName) {
      setBoardName(savedBoardName);
    }
  }, [savedBoardName]);

  return (
    <div className="flex items-center my-2">
      <input
        ref={inputRef}
        value={boardName}
        onChange={handleChange}
        onFocus={() => toggleEditIcon(false)}
        onBlur={() => toggleEditIcon(true)}
        placeholder={placeholder}
        className="p-3 w-0 bg-transparent text-3xl font-medium pl-0 focus:outline-none border-b border-transparent focus:border-b focus:border-black focus:border-dashed dark:text-white dark:focus:border-white"
      />
      {showEditIcon && (
        <PencilIcon width={16} height={16} className="text-gray-500" />
      )}
    </div>
  );
}
