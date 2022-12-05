import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { columnsService } from 'components/service/columnsService/columnsService';
import { ColumnsInBoardResponseType } from '../../components/service/columnsService/types';

const { getColumnsInBoard } = columnsService;

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

// export const createNewBoard = createAsyncThunk<BoardResponseType | null, string>(
//   'board/createNewBoard',
//   async (title) => {
//     const response = await createBoard(title);
//     return response;
//   }
// );

// export const removeBoardById = createAsyncThunk<string, string>(
//   'board/removeBoardById',
//   async (id) => {
//     await deleteBoardById(id);
//     return id;
//   }
// );

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

    // builder.addCase(createNewBoard.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     state.boards.push(action.payload);
    //   }
    // });

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
