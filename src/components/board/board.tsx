import React from 'react';
import { BoardProps } from './types';

const Board = (props: BoardProps) => {
  const { title } = props;
  return (
    <div className="board-wrapper">
      <h3 className="board-title">{title}</h3>
      <div className="board-buttons">
        <button className="board-buttons__delete">Delete</button>
        <button className="board-buttons__go-board">Go to board</button>
      </div>
    </div>
  );
};

export default Board;
