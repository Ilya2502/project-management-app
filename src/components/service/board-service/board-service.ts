// import { isExpired, decodeToken } from 'react-jwt';
import { getData, postData } from '../fetch-service/fetch-service';
import { BoardType, NewBoardType, DecodedTokenType } from './types';

export const createBoard = async (title: string, users = ['']) => {
  // в title json.stringify({title: '', description: ''})
  const endPoint = `boards`;
  let owner = '';
  let decodedToken: DecodedTokenType;
  const decodedTokenString = localStorage.getItem('decodedToken');
  if (decodedTokenString) {
    decodedToken = JSON.parse(decodedTokenString);
    owner = decodedToken?.id;
  }
  const body = { title, owner, users };
  const data = await postData<BoardType, NewBoardType>(endPoint, body);
  console.log(data);
  return data;
};

// export const loginUser = async (login: string, password: string) => {
//   const endPoint = `auth/signin`;
//   const body = { login, password };
//   const data = await postData<TokenType, LoginUserType>(endPoint, body);
//   const token = JSON.stringify(data?.token);
//   console.log(data);
//   const myDecodedToken: DecodedTokenType = decodeToken(token);
//   const isMyTokenExpired = isExpired(token);
//   localStorage.setItem('token', token);
//   if (myDecodedToken?.id) {
//     localStorage.setItem('userId', JSON.stringify(myDecodedToken?.id));
//   }
//   console.log(myDecodedToken, isMyTokenExpired);
//   return data;
// };

export const getAllBoards = async () => {
  const endPoint = `boards`;
  const data = await getData<BoardType[]>(endPoint);
  console.log(data);
  return data;
};

// export const getUserById = async () => {
//   let userId = '';
//   const userIdString = localStorage.getItem('userId');
//   if (userIdString) {
//     userId = JSON.parse(userIdString);
//   }
//   const endPoint = `users/${userId}`;
//   const data = await getData<UserType>(endPoint);
//   console.log(data);
//   return data;
// };
