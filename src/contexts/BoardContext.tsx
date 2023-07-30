import { createContext, ReactNode, useContext, useState } from "react";
import { CardProp } from "../components/kanban/types";

type BoardContextType = {
  board: object | undefined;
  cards: [];
  list: [];
  setBoard: (payload: { board: object | null; cards: []; list: [] }) => void;
  setCards: (cards: CardProp[]) => void;
};

const defaultBoard = {
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
});

export const useBoardContext = () => useContext(BoardContext);
export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoardData] = useState(defaultBoard);

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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
