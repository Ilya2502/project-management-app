import { RequestType } from './types';
import { getLocalStorageItem } from '../localStorageService/localStorageService';

const baseUrl = `https://final-task-backend-production-6cf1.up.railway.app`;

const getRequestConfig = <B>(requestType: RequestType, body: B) => {
  const token: string | null | undefined = getLocalStorageItem('token');
  const config = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  switch (requestType) {
    case 'DELETE':
      return {
        method: 'DELETE',
        ...config,
      };
    case 'POST':
      return {
        method: 'POST',
        ...config,
      };
    case 'PUT':
      return {
        method: 'PUT',
        ...config,
      };
    case 'GET':
      return {
        method: 'GET',
        ...config,
      };
    default:
      return {};
  }
};

const typedFetch = async <T, B>(
  endPoint: string,
  request: RequestType,
  body?: B
): Promise<T | null> => {
  const url = `${baseUrl}/${endPoint}`;
  const requestConfig = getRequestConfig(request, body);
  const response = await fetch(`${url}`, requestConfig);
  const data = await response.json();
  return data;
};

export const getData = async <T>(endPoint: string) => {
  const data = await typedFetch<T, never>(endPoint, 'GET');
  return data;
};

export const postData = async <R, B>(endPoint: string, body: B) => {
  const data = await typedFetch<R, B>(endPoint, 'POST', body);
  return data;
};

export const deleteData = async (endPoint: string) => {
  await typedFetch<never, never>(endPoint, 'DELETE');
};

export const putData = async <R, B>(endPoint: string, body: B) => {
  const data = await typedFetch<R, B>(endPoint, 'PUT', body);
  return data;
};
