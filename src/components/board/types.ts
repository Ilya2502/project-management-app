import { BoardResponseType } from 'components/service/boardService/types';

export type BoardProps = Pick<BoardResponseType, 'title' | '_id'>;
