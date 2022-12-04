import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { boardService } from '../../components/service/boardService/boardService';
import { BoardResponseType } from '../../components/service/boardService/types';

const { getAllBoards, deleteBoardById } = boardService;

const boardState: BoardResponseType = {
  _id: '',
  title: '',
  owner: '',
  users: [''],
};

const initialState = {
  boards: [boardState],
};

export const fetchAllBoards = createAsyncThunk('board/fetchAllBoards', async (_, { dispatch }) => {
  const result = await getAllBoards();
  dispatch(setBoards(result));
});

export const removeBoardById = createAsyncThunk<string, string>(
  'board/removeBoardById',
  async (id) => {
    await deleteBoardById(id);
    return id;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.fulfilled, (state, action) => {
      state.board = action.payload;
    });

    builder.addCase(removeBoardById.fulfilled, (state, action) => {
      state.boards = state.boards.filter((board) => board._id !== action.payload);
    });
  },
});

export const { setBoards } = boardSlice.actions;
export default boardSlice.reducer;
