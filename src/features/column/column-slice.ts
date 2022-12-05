import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { columnsService } from 'components/service/columnsService/columnsService';
import {
  ColumnsInBoardResponseType,
  ColumnResponseType,
} from '../../components/service/columnsService/types';

const { getColumnsInBoard, createColumn, deleteColumnById } = columnsService;

const columnState: ColumnsInBoardResponseType = {
  _id: '',
  title: '',
  order: 0,
  boardId: '',
};

const initialState = {
  columns: [columnState],
};

export const fetchAllColumns = createAsyncThunk<ColumnsInBoardResponseType[] | null, string>(
  'column/fetchAllColumns',
  async (id) => {
    const result = await getColumnsInBoard(id);
    return result;
  }
);

export const createNewColumn = createAsyncThunk<
  ColumnResponseType | null,
  { boardId: string; title: string; order: number }
>('board/createNewColumn', async ({ boardId, title, order }) => {
  const response = await createColumn(boardId, title, order);
  return response;
});

export const removeColumnById = createAsyncThunk<string, { boardId: string; columnId: string }>(
  'board/removeColumnById',
  async ({ boardId, columnId }) => {
    await deleteColumnById(boardId, columnId);
    return columnId;
  }
);

// export const updateCurrentBoard = createAsyncThunk<
//   BoardResponseType | null,
//   { id: string; title: string }
// >('board/updateCurrentBoard', async (props) => {
//   const { id, title } = props;
//   const response = await updateBoardById(id, title);
//   return response;
// });

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllColumns.fulfilled, (state, action) => {
      if (action.payload) state.columns = action.payload;
    });

    builder.addCase(createNewColumn.fulfilled, (state, action) => {
      if (action.payload) {
        state.columns.push(action.payload);
      }
    });

    builder.addCase(removeColumnById.fulfilled, (state, action) => {
      state.columns = state.columns.filter((column) => column._id !== action.payload);
    });

    // builder.addCase(updateCurrentBoard.fulfilled, (state, action) => {
    //   state.boards = state.boards.map((board) => {
    //     if (board._id === action?.payload?._id) {
    //       return action.payload;
    //     }
    //     return board;
    //   });
    // });
  },
});

export default columnSlice.reducer;
