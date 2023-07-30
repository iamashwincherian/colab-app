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
  updateCard: ({ cardId, title }: { cardId: number; title: string }) => void;
  deleteCard: (cardId: number) => void;
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
  updateCard() {},
  deleteCard() {},
});

export const useBoardContext = () => useContext(BoardContext);
export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoardData] = useState(defaultBoard);
  const updateCardMutation = trpc.cards.update.useMutation();
  const deleteCardMutation = trpc.cards.delete.useMutation();

  return (
    <BoardContext.Provider
      value={{
        ...board,
        setBoard: (payload: object) => {
          setBoardData({ ...board, ...payload });
        },
        setCards: (cards) => {
          if (cards.length) setBoardData({ ...board, cards });
        },
        updateCard: ({ cardId, title }) => {
          const cards = board.cards.filter((card) => card.id !== cardId);
          const cardToEdit = board.cards.find((card) => card.id === cardId);
          setBoardData({
            ...board,
            cards: [...cards, { ...cardToEdit, title }],
          });
          updateCardMutation.mutate({ id: cardId, title });
        },
        deleteCard: (cardId) => {
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
