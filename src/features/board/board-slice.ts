import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { boardService } from '../../components/service/boardService/boardService';
import { BoardResponseType } from '../../components/service/boardService/types';
// import Fuse from "fuse.js";

// const fuse = new Fuse(books, {
//   keys: ["title", "author"],
// });

const { getAllBoards, deleteBoardById, createBoard, updateBoardById } = boardService;

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

export const createNewBoard = createAsyncThunk<BoardResponseType | null, string>(
  'board/createNewBoard',
  async (title) => {
    const response = await createBoard(title);
    return response;
  }
);

export const updateCurrentBoard = createAsyncThunk<
  BoardResponseType | null,
  { id: string; title: string }
>('board/updateCurrentBoard', async (props) => {
  const { id, title } = props;
  const response = await updateBoardById(id, title);
  return response;
});

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    searchBoard: (state, action) => {
      state.boards = state.boards.filter((board) => board.title.includes(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeBoardById.fulfilled, (state, action) => {
      state.boards = state.boards.filter((board) => board._id !== action.payload);
    });

    builder.addCase(createNewBoard.fulfilled, (state, action) => {
      if (action.payload) {
        state.boards.push(action.payload);
      }
    });

    builder.addCase(updateCurrentBoard.fulfilled, (state, action) => {
      state.boards = state.boards.map((board) => {
        if (board._id === action?.payload?._id) {
          return action.payload;
        }
        return board;
      });
    });
  },
});

export const { setBoards, searchBoard } = boardSlice.actions;
export default boardSlice.reducer;
