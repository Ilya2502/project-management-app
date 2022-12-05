import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from 'components/service/localStorageService/localStorageService';

const initialState = {
  userToken: getLocalStorageItem('token'),
  userLogin: getLocalStorageItem('decodedToken')?.login || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUserToken, setUserLogin } = userSlice.actions;
export default userSlice.reducer;
