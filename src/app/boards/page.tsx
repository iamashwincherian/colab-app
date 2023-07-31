"use client";

import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import MainContent from "../../components/layoutWrapper/MainContent";
import BoardCard from "./components/BoardCard";
import withAuth from "../../utils/withAuth";
import { trpc } from "../../utils/trpc/trpc";

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

export default trpc.withTRPC(withAuth(Boards));
