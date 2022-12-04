import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { boardService } from '../../components/service/boardService/boardService';

const { getAllBoards } = boardService;

const initialState = {
  boards: [],
};

export const getBoards = createAsyncThunk('board/getBoards', async (_, { dispatch }) => {
  const result = await getAllBoards();
  dispatch(setBoards(result));
});

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.board = action.payload;
    });
  },
});

export const { setBoards } = boardSlice.actions;
export default boardSlice.reducer;
