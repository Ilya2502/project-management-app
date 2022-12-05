import { getData, postData, deleteData, putData } from '../fetchService/fetchService';
import {
  TaskResponseType,
  NewTaskType,
  UpdateTaskType,
  UpdateTaskResponseType,
  NewParamsTaskType,
} from './types';
import { getLocalStorageUserId } from '../localStorageService/localStorageService';

const createTask = async (
  boardId: string,
  columnId: string,
  title: string,
  order: number,
  description: string,
  users = ['']
) => {
  const endPoint = `boards/${boardId}/columns/${columnId}/tasks`;
  const userId = getLocalStorageUserId();
  const body = { title, order, description, userId, users };
  const data = await postData<TaskResponseType, NewTaskType>(endPoint, body);
  return data;
};

const getTasksInColumn = async (boardId: string, columnId: string) => {
  const endPoint = `boards/${boardId}/columns/${columnId}/tasks`;
  const data = await getData<TaskResponseType[]>(endPoint);
  return data;
};

const getTaskById = async (boardId: string, columnId: string, taskId: string) => {
  const endPoint = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  const data = await getData<TaskResponseType>(endPoint);
  return data;
};

const getTasksByUserId = async () => {
  const userId = getLocalStorageUserId();
  const endPoint = `tasksSet?userId=${userId}`;
  const data = await getData<TaskResponseType[]>(endPoint);
  return data;
};

const getTasksByBoardId = async (boardId: string) => {
  const endPoint = `tasksSet/${boardId}`;
  const data = await getData<TaskResponseType[]>(endPoint);
  return data;
};

const deleteTaskById = async (boardId: string, columnId: string, taskId: string) => {
  const endPoint = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  const data = await deleteData(endPoint);
  return data;
};

const updateTaskById = async (
  boardId: string,
  columnId: string,
  taskId: string,
  newParams: NewParamsTaskType
) => {
  const endPoint = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  const userId = getLocalStorageUserId();
  const body = { ...newParams, userId, users: [''] };
  const data = await putData<UpdateTaskResponseType, UpdateTaskType>(endPoint, body);
  return data;
};

export const taskService = {
  getTasksInColumn,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getTasksByUserId,
  getTasksByBoardId,
};
