import getBoardData from "./getBoardData";
import onDragEnd from "./onDragEnd";
import updateCardPosition from "./updateCardPosition";

const BoardService = {
  getData: getBoardData,
  onDragEnd: onDragEnd,
  updateCardPosition: updateCardPosition,
};

export default BoardService;
