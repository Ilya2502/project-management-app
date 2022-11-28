import { getData, postData } from '../fetch-service/fetch-service';
import { UserType, NewUserType, LoginUserType } from './types';

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
  const data = await postData<UserType, LoginUserType>(endPoint, body);
  console.log(data);
  return data;
};

export const getAllUsers = async () => {
  const endPoint = `users`;
  const data = await getData<UserType[]>(endPoint);
  console.log(data);
  return data;
};
