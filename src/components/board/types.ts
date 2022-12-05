import { BoardResponseType } from 'components/service/boardService/types';

export type BoardProps = Pick<BoardResponseType, 'title' | '_id'>;

export interface IBoardData {
  title: string;
  description?: string;
}

export interface IUpdateBoard {
  title: string;
  description: string;
}
