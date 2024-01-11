import { List as ListModal, Board as BoardModal, Card } from "@prisma/client";

export interface List extends ListModal {
  cards?: Card[];
}

export interface Board extends BoardModal {
  lists: List[];
}
