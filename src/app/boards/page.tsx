"use client";

import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import { trpc } from "../../utils/trpc/trpc";
import BoardCard from "./components/BoardCard";

const Boards = () => {
  const boards = trpc.boards.all.useQuery()?.data;

  return (
    <FullScreenLayout nav>
      <MainContent title="Boards">
        {boards?.map(({ id, name }) => (
          <BoardCard key={id} id={id} name={name} />
        ))}
      </MainContent>
    </FullScreenLayout>
  );
};

export default trpc.withTRPC(Boards);
