import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { BoardProps, IBoardData } from './types';
import { removeBoardById } from 'features/board/board-slice';
import { AppDispatch } from 'store/store';

const Board = (props: BoardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, _id } = props;

  let boardData: IBoardData = { title: '', description: '' };
  if (title.includes('{')) {
    boardData = JSON.parse(title);
  }

  const deleteBoardHandler = (id: string) => {
    dispatch(removeBoardById(id));
  };

  return (
    <div className="board-wrapper">
      {title.includes('{') ? (
        <Fragment>
          <h3 className="board-title">{boardData.title}</h3>
          <p className="board-description">{boardData.description}</p>
        </Fragment>
      ) : (
        <Fragment>
          <h3 className="board-title">{title}</h3>
          <p className="board-description">---</p>
        </Fragment>
      )}
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
