import { getData, postData, deleteData, putData } from '../fetchService/fetchService';
import { ColumnsInBoardResponseType, NewColumnType, ColumnResponseType } from './types';
import { getLocalStorageUserId } from '../localStorageService/localStorageService';

const createColumn = async (boardId: string, title: string, order: number) => {
  const endPoint = `boards/${boardId}/columns`;
  const body = { title, order };
  const data = await postData<ColumnResponseType, NewColumnType>(endPoint, body);
  return data;
};

const getColumnsInBoard = async (boardId: string) => {
  const endPoint = `boards/${boardId}/columns`;
  const data = await getData<ColumnsInBoardResponseType[]>(endPoint);
  return data;
};

const getColumnById = async (boardId: string, columnId: string) => {
  const endPoint = `boards/${boardId}/columns/${columnId}`;
  const data = await getData<ColumnResponseType>(endPoint);
  console.log(data);
  return data;
};

const getColumnsByUserId = async () => {
  const userId = getLocalStorageUserId();
  const endPoint = `columnsSet?userId=${userId}`;
  const data = await getData<ColumnResponseType[]>(endPoint);
  console.log(data);
  return data;
};

const deleteColumnById = async (boardId: string, columnId: string) => {
  const endPoint = `boards/${boardId}/columns/${columnId}`;
  await deleteData(endPoint);
};

const updateColumnById = async (
  boardId: string,
  columnId: string,
  title: string,
  order: number
) => {
  const endPoint = `boards/${boardId}/columns/${columnId}`;
  const body = { title, order };
  const data = await putData<ColumnResponseType, NewColumnType>(endPoint, body);
  console.log(data);
  return data;
};

export const columnsService = {
  getColumnsInBoard,
  createColumn,
  getColumnById,
  updateColumnById,
  deleteColumnById,
  getColumnsByUserId,
};
