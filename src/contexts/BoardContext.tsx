import { createContext, ReactNode, useContext, useState } from "react";
import { CardProp, ListProp } from "../components/kanban/types";
import { trpc } from "../utils/trpc/trpc";

interface BoardType {
  board: object | undefined;
  list: ListProp[];
  cards: CardProp[];
}

interface BoardContextType extends BoardType {
  setBoard: (payload: { board: object | null; cards: []; list: [] }) => void;
  setCards: (cards: CardProp[]) => void;
  deleteCard: (card: CardProp) => void;
}

const defaultBoard: BoardType = {
  board: {},
  list: [],
  cards: [],
};

const BoardContext = createContext<BoardContextType>({
  board: {},
  list: [],
  cards: [],
  setBoard() {},
  setCards() {},
  deleteCard() {},
});

export const useBoardContext = () => useContext(BoardContext);
export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoardData] = useState(defaultBoard);
  const deleteCardMutation = trpc.cards.delete.useMutation();

  return (
    <BoardContext.Provider
      value={{
        ...board,
        setBoard: (payload: object) => {
          setBoardData({ ...board, ...payload });
        },
        setCards: (cards: CardProp[] = []) => {
          if (cards.length) setBoardData({ ...board, cards });
        },
        deleteCard: (cardId: CardProp = []) => {
          const cards = board.cards.filter((card) => card.id !== cardId);
          setBoardData({ ...board, cards });
          deleteCardMutation.mutate({ cardId });
        },
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
