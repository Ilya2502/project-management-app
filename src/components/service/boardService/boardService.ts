import { getData, postData, deleteData, putData } from '../fetchService/fetchService';
import { BoardResponseType, NewBoardType } from './types';
import { getLocalStorageUserId } from '../localStorageService/localStorageService';

const createBoard = async (title: string, users = ['']) => {
  // в title json.stringify({title: '', description: ''})
  const endPoint = `boards`;
  const owner = getLocalStorageUserId();
  const body = { title, owner, users };
  const data = await postData<BoardResponseType, NewBoardType>(endPoint, body);
  console.log(data);
  return data;
};

const getAllBoards = async () => {
  const endPoint = `boards`;
  const data = await getData<BoardResponseType[]>(endPoint);
  console.log(data);
  return data;
};

const getBoardById = async (boardId: string) => {
  const endPoint = `boards/${boardId}`;
  const data = await getData<BoardResponseType>(endPoint);
  console.log(data);
  return data;
};

const getBoardsByUserId = async () => {
  const userId = getLocalStorageUserId();
  const endPoint = `boardsSet/${userId}`;
  const data = await getData<BoardResponseType[]>(endPoint);
  console.log(data);
  return data;
};

const deleteBoardById = async (boardId: string) => {
  const endPoint = `boards/${boardId}`;
  const data = await deleteData(endPoint);
  console.log(data);
  return data;
};

const updateBoardById = async (boardId: string, title: string, users = ['']) => {
  const endPoint = `boards/${boardId}`;
  const owner = getLocalStorageUserId();
  const body = { title, owner, users };
  const data = await putData<BoardResponseType, NewBoardType>(endPoint, body);
  console.log(data);
  return data;
};

export const boardService = {
  createBoard,
  getAllBoards,
  getBoardById,
  getBoardsByUserId,
  deleteBoardById,
  updateBoardById,
};
