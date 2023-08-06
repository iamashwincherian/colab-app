import { createContext, ReactNode, useContext, useState } from "react";
import { BoardProp, CardProp, ListProp } from "../components/kanban/types";
import { trpc } from "../utils/trpc/trpc";

interface BoardType {
  board: BoardProp;
  list: ListProp[];
  cards: CardProp[];
}

interface BoardContextType extends BoardType {
  setBoard: (payload: {
    board: BoardProp;
    cards: CardProp[];
    list: ListProp[];
  }) => void;
  setCards: (cards: CardProp[]) => void;
  createList: ({ name, boardId }: { name: string; boardId: number }) => void;
  editList: ({ name, listId }: { name: string; listId: number }) => void;
  deleteList: ({ listId }: { listId: number }) => void;
  createCard: ({
    title,
    boardId,
    listId,
  }: {
    title: string;
    boardId: number;
    listId: number;
  }) => void;
  updateCard: ({ cardId, title }: { cardId: number; title: string }) => void;
  deleteCard: (cardId: number) => void;
}

const defaultBoard: BoardType = {
  board: null,
  list: [],
  cards: [],
};

const BoardContext = createContext<BoardContextType>({
  board: null,
  list: [],
  cards: [],
  setBoard() {},
  setCards() {},
  createList() {},
  editList() {},
  deleteList() {},
  createCard() {},
  updateCard() {},
  deleteCard() {},
});

export const useBoardContext = () => useContext(BoardContext);
export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoardData] = useState(defaultBoard);
  const createListMutation = trpc.lists.create.useMutation();
  const editListMutation = trpc.lists.edit.useMutation();
  const deleteListMutation = trpc.lists.delete.useMutation();
  const createCardMutation = trpc.cards.create.useMutation();
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
        createList: async ({ name, boardId }) => {
          const newList = await createListMutation.mutateAsync({
            name,
            boardId,
          });
          setBoardData({ ...board, list: [...board.list, newList] });
        },
        editList: async ({ listId, name }) => {
          const list = board.list.filter((item) => item?.id !== listId);
          const listToEdit = board.list.find((item) => item?.id === listId);
          await editListMutation.mutateAsync({ id: listId, name });
          setBoardData({
            ...board,
            list: [...list, { ...listToEdit, name }] as ListProp[],
          });
        },
        deleteList: ({ listId }) => {
          const list = board.list.filter((list) => list?.id !== listId);
          deleteListMutation.mutate({ listId });
          setBoardData({ ...board, list });
        },
        createCard: async ({ title, boardId, listId }) => {
          const newCard = await createCardMutation.mutateAsync({
            boardId,
            listId,
            title,
          });
          setBoardData({ ...board, cards: [...board.cards, newCard] });
        },
        updateCard: ({ cardId, title }) => {
          const cards = board.cards.filter((card) => card?.id !== cardId);
          const cardToEdit = board.cards.find((card) => card?.id === cardId);
          updateCardMutation.mutate({ id: cardId, title });
          setBoardData({
            ...board,
            cards: [...cards, { ...cardToEdit, title }] as CardProp[],
          });
        },
        deleteCard: (cardId) => {
          const cards = board.cards.filter((card) => card?.id !== cardId);
          setBoardData({ ...board, cards });
          deleteCardMutation.mutate({ cardId });
        },
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
