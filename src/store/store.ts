import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'features/user/user-slice';
import boardSlice from 'features/board/board-slice';
import columnSlice from 'features/column/column-slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
    column: columnSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
