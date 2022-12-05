import { ColumnResponseType } from 'components/service/columnsService/types';

export type ColumnProps = Pick<ColumnResponseType, 'title' | '_id' | 'order'>;

export interface IColumnData {
  title: string;
}

export interface IUpdateColumn {
  title: string;
}
