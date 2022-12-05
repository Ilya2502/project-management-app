import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from 'components/service/taskService/taskService';
import { TaskResponseType } from '../../components/service/taskService/types';

const { getTasksInColumn, getTasksByBoardId, createTask } = taskService;

const taskState: TaskResponseType = {
  _id: '',
  title: '',
  order: 0,
  boardId: '',
  columnId: '',
  description: '',
  userId: '',
  users: [],
};

const initialState = {
  tasks: [taskState],
};

export const fetchAllTasks = createAsyncThunk<TaskResponseType[] | null, string>(
  'column/fetchAllTasks',
  async (id) => {
    const result = await getTasksByBoardId(id);
    return result;
  }
);

export const fetchColumnTasks = createAsyncThunk<
  TaskResponseType[] | null,
  { boardId: string; columnId: string }
>('column/fetchColumnTasks', async ({ boardId, columnId }) => {
  const result = await getTasksInColumn(boardId, columnId);
  return result;
});

export const createNewTask = createAsyncThunk<
  TaskResponseType | null,
  { boardId: string; columnId: string; title: string; order: number; description: string }
>('board/createNewColumn', async ({ boardId, columnId, title, order, description }) => {
  const response = await createTask(boardId, columnId, title, order, description);
  return response;
});

// export const removeColumnById = createAsyncThunk<string, { boardId: string; columnId: string }>(
//   'board/removeColumnById',
//   async ({ boardId, columnId }) => {
//     await deleteColumnById(boardId, columnId);
//     return columnId;
//   }
// );

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      if (action.payload) state.tasks = action.payload;
    });

    builder.addCase(fetchColumnTasks.fulfilled, (state, action) => {
      if (action.payload) state.tasks = action.payload;
    });

    builder.addCase(createNewTask.fulfilled, (state, action) => {
      if (action.payload) {
        state.tasks.push(action.payload);
      }
    });

    // builder.addCase(removeColumnById.fulfilled, (state, action) => {
    //   state.columns = state.columns.filter((column) => column._id !== action.payload);
    // });
  },
});

export default taskSlice.reducer;
