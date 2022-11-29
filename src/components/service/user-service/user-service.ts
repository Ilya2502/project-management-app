import { isExpired, decodeToken } from 'react-jwt';
import { getData, postData } from '../fetch-service/fetch-service';
import { UserType, NewUserType, LoginUserType, TokenType, DecodedTokenType } from './types';
import {
  getLocalStorageUserId,
  setLocalStorageItem,
} from '../local-storage-service/local-storage-service';

const createUser = async (name: string, login: string, password: string) => {
  const endPoint = `auth/signup`;
  const body = { name, login, password };
  const data = await postData<UserType, NewUserType>(endPoint, body);
  console.log(data);
  return data;
};

const loginUser = async (login: string, password: string) => {
  const endPoint = `auth/signin`;
  const body = { login, password };
  const data = await postData<TokenType, LoginUserType>(endPoint, body);
  const token = JSON.stringify(data?.token);
  console.log(data);
  const decodedToken: DecodedTokenType | null = decodeToken(token);
  const isTokenExpired = isExpired(token);
  setLocalStorageItem('token', data?.token);
  if (decodedToken) {
    setLocalStorageItem('decodedToken', decodedToken);
    setLocalStorageItem('isMyTokenExpired', isTokenExpired);
  }
  return data;
};

const getAllUsers = async () => {
  const endPoint = `users`;
  const data = await getData<UserType[]>(endPoint);
  console.log(data);
  return data;
};

const getUserById = async () => {
  const userId = getLocalStorageUserId();
  const endPoint = `users/${userId}`;
  const data = await getData<UserType>(endPoint);
  console.log(data);
  return data;
};

export const userService = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};
