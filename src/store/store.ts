import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'features/user/user-slice';
import boardSlice from 'features/board/board-slice';
import columnSlice from 'features/column/column-slice';
import taskSlice from 'features/task/task-slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
    column: columnSlice,
    task: taskSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
