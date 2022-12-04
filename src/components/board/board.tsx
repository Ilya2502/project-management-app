import React from 'react';
import { useDispatch } from 'react-redux';
import { BoardProps } from './types';
import { removeBoardById } from 'features/board/board-slice';

const Board = (props: BoardProps) => {
  const dispatch = useDispatch();
  const { title, _id } = props;

  const deleteBoardHandler = (id: string) => {
    dispatch(removeBoardById(id));
  };

  return (
    <div className="board-wrapper">
      <h3 className="board-title">{title}</h3>
      <div className="board-buttons">
        <button className="board-buttons__go-board">Go to board</button>
        <button className="board-buttons__delete" onClick={() => deleteBoardHandler(_id)}>
          Delete
        </button>
        <button className="board-buttons__update">Update</button>
      </div>
    </div>
  );
};

export default Board;
