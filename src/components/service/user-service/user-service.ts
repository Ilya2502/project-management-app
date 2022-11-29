import { isExpired, decodeToken } from 'react-jwt';
import { getData, postData } from '../fetch-service/fetch-service';
import { UserType, NewUserType, LoginUserType, TokenType, DecodedTokenType } from './types';

export const createUser = async (name: string, login: string, password: string) => {
  const endPoint = `auth/signup`;
  const body = { name, login, password };
  const data = await postData<UserType, NewUserType>(endPoint, body);
  console.log(data);
  return data;
};

export const loginUser = async (login: string, password: string) => {
  const endPoint = `auth/signin`;
  const body = { login, password };
  const data = await postData<TokenType, LoginUserType>(endPoint, body);
  const token = JSON.stringify(data?.token);
  console.log(data);
  const myDecodedToken: DecodedTokenType = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  localStorage.setItem('token', token);
  if (myDecodedToken?.id) {
    localStorage.setItem('userId', JSON.stringify(myDecodedToken?.id));
  }
  console.log(myDecodedToken, isMyTokenExpired);
  return data;
};

export const getAllUsers = async () => {
  const endPoint = `users`;
  const data = await getData<UserType[]>(endPoint);
  console.log(data);
  return data;
};

export const getUserById = async () => {
  let userId = '';
  const userIdString = localStorage.getItem('userId');
  if (userIdString) {
    userId = JSON.parse(userIdString);
  }
  const endPoint = `users/${userId}`;
  const data = await getData<UserType>(endPoint);
  console.log(data);
  return data;
};
