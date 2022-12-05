import { isExpired, decodeToken } from 'react-jwt';
import { getData, postData, putData, deleteData } from '../fetchService/fetchService';
import { UserType, NewUserType, LoginUserType, TokenType, DecodedTokenType } from './types';
import {
  getLocalStorageUserId,
  setLocalStorageItem,
} from '../localStorageService/localStorageService';

const createUser = async (name: string, login: string, password: string) => {
  const endPoint = `auth/signup`;
  const body = { name, login, password };
  const data = await postData<UserType, NewUserType>(endPoint, body);
  return data;
};

const loginUser = async (login: string, password: string) => {
  const endPoint = `auth/signin`;
  const body = { login, password };
  const data = await postData<TokenType, LoginUserType>(endPoint, body);
  const token = JSON.stringify(data?.token);
  const decodedToken: DecodedTokenType | null = decodeToken(token);
  if (data?.token) {
    const isTokenExpired = isExpired(token);
    setLocalStorageItem('token', data?.token);
    if (decodedToken) {
      setLocalStorageItem('decodedToken', decodedToken);
      setLocalStorageItem('isMyTokenExpired', isTokenExpired);
    }
  }
  return data;
};

const getAllUsers = async () => {
  const endPoint = `users`;
  const data = await getData<UserType[]>(endPoint);
  return data;
};

const getUserById = async () => {
  const userId = getLocalStorageUserId();
  const endPoint = `users/${userId}`;
  const data = await getData<UserType>(endPoint);
  return data;
};

const updateUserById = async (name: string, login: string, password: string) => {
  const userId = getLocalStorageUserId();
  const endPoint = `users/${userId}`;
  const body = { name, login, password };
  const data = await putData<UserType, NewUserType>(endPoint, body);
  return data;
};

export const userSignOut = () => {
  localStorage.clear();
};

const deleteUserById = async () => {
  const userId = getLocalStorageUserId();
  const endPoint = `users/${userId}`;
  await deleteData(endPoint);
  userSignOut();
};

export const userService = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userSignOut,
};
