import { DecodedTokenType } from '../user-service/types';

export const getLocalStorageUserId = () => {
  let userId = '';
  let decodedToken: DecodedTokenType;
  const decodedTokenString = localStorage.getItem('decodedToken');
  if (decodedTokenString) {
    decodedToken = JSON.parse(decodedTokenString);
    userId = decodedToken.id;
  }
  return userId;
};

export const getLocalStorageItem = (key: string) => {
  let item = '';
  const itemString = localStorage.getItem(key);
  if (itemString) {
    item = JSON.parse(itemString);
  }
  return item;
};

export const setLocalStorageItem = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
