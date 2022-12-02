import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from 'components/service/localStorageService/localStorageService';

const initialState = {
  userToken: getLocalStorageItem('token'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { setUserToken } = userSlice.actions;
export default userSlice.reducer;
