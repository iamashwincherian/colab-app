import createCard from "./createCard";
import deleteCard from "./deleteCard";
import getBoardData from "./getBoardData";
import onDragEnd from "./onDragEnd";
import updateCardPosition from "./updateCardPosition";

export const BoardService = {
  onDragEnd,
  deleteCard,
  createCard,
  updateCardPosition,
  getData: getBoardData,
};

export default BoardService;
