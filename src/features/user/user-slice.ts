import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: '',
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
