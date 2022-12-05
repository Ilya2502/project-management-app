import { DecodedTokenType } from '../userService/types';

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
  const storageString = localStorage.getItem(key);
  return !storageString ? null : JSON.parse(storageString);
};

export const setLocalStorageItem = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
