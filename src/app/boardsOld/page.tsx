"use client";

import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import BoardCard from "./components/BoardCard";
import withAuth from "../../utils/withAuth";
import { trpc } from "../../utils/trpc/trpc";
import openModal from "@/utils/openModal";
import CreateBoardModal from "@/components/kanban/modals/CreateBoardModal";
import { useEffect, useState } from "react";

const Boards = () => {
  const { data, status } = trpc.boards.all.useQuery();
  const createBoardMutation = trpc.boards.create.useMutation();
  const [boards, setBoards] = useState(data || []);

  useEffect(() => {
    if (status === "success") {
      setBoards(data);
    }
  }, [status]);

  const handleCreateBoard = () => {
    openModal(
      <CreateBoardModal
        onSubmit={async ({ name }: { name: string }) => {
          const newBoard = await createBoardMutation.mutateAsync({
            name,
            createSample: true,
          });
          setBoards([...boards, newBoard]);
        }}
      />
    );
  };

  return (
    <FullScreenLayout nav>
      <MainContent
        title="Boards"
        buttons={[{ label: "Create", onClick: handleCreateBoard }]}
      >
        <div className="flex flex-wrap gap-8">
          {boards?.map(({ id, name }) => (
            <BoardCard key={id} id={id} name={name} />
          ))}
        </div>
      </MainContent>
    </FullScreenLayout>
  );
};

export default withAuth(Boards);
