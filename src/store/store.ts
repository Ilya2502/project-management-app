import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'features/user/user-slice';
import boardSlice from 'features/board/board-slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
  },
});
