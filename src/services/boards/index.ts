import createCard from "./createCard";
import createList from "./createList";
import deleteCard from "./deleteCard";
import deleteList from "./deleteList";
import editList from "./editList";
import getBoardData from "./getBoardData";
import onDragEnd from "./onDragEnd";
import updateCardPosition from "./updateCardPosition";

export const BoardService = {
  onDragEnd,
  deleteCard,
  createCard,
  updateCardPosition,
  editList,
  deleteList,
  createList,
  getData: getBoardData,
};

export default BoardService;
