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
  const decodedToken: DecodedTokenType | null = decodeToken(token);
  const isTokenExpired = isExpired(token);
  localStorage.setItem('token', token);
  if (decodedToken) {
    localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
    localStorage.setItem('isMyTokenExpired', JSON.stringify(isTokenExpired));
  }
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
  let decodedToken: DecodedTokenType;
  const decodedTokenString = localStorage.getItem('decodedToken');
  if (decodedTokenString) {
    decodedToken = JSON.parse(decodedTokenString);
    userId = decodedToken.id;
  }
  const endPoint = `users/${userId}`;
  const data = await getData<UserType>(endPoint);
  console.log(data);
  return data;
};
