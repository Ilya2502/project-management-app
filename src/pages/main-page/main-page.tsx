import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { ICreateBoard } from './types';
import { fetchAllBoards } from 'features/board/board-slice';
import Board from 'components/board/board';
import { RootState } from 'share/types';

const MainPage = () => {
  const dispatch = useDispatch();
  const allBoards = useSelector((state: RootState) => state.board.boards);
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBoard>();

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  const modalWindowHandler = () => {
    openModalWindow ? setOpenModalWindow(false) : setOpenModalWindow(true);
  };

  const onSubmit = (data: ICreateBoard) => {
    console.log(data);
    reset();
    modalWindowHandler();
  };

  return (
    <React.Fragment>
      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="create-board-wrapper">
          <form className="create-board-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="create-board-form__label" htmlFor="title">
              Title:
              <input
                className="create-board-form__input"
                type="text"
                placeholder="Title"
                {...register('title', {
                  required: 'Input your title',
                  minLength: {
                    value: 4,
                    message: 'minimum of 4 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'maximum of 40 characters',
                  },
                })}
              />
              {errors?.title?.type === 'required' && (
                <span className="error">{errors?.title?.message}</span>
              )}
              {errors?.title?.type === 'minLength' && (
                <span className="error">{errors?.title?.message}</span>
              )}
              {errors?.title?.type === 'maxLength' && (
                <span className="error">{errors?.title?.message}</span>
              )}
            </label>

            <label className="create-board-form__label" htmlFor="description">
              Description:
              <textarea
                className="create-board-form__textarea"
                placeholder="Description"
                {...register('description', {
                  required: 'Input your description',
                  minLength: {
                    value: 6,
                    message: 'minimum of 6 characters',
                  },
                  maxLength: {
                    value: 200,
                    message: 'maximum of 200 characters',
                  },
                })}
              />
              {errors?.description?.type === 'required' && (
                <span className="error">{errors?.description?.message}</span>
              )}
              {errors?.description?.type === 'minLength' && (
                <span className="error">{errors?.description?.message}</span>
              )}
              {errors?.description?.type === 'maxLength' && (
                <span className="error">{errors?.description?.message}</span>
              )}
            </label>

            <input className="create-board-form__submit" type="submit" value={'Create Board'} />
          </form>
        </div>
      </ModalWindow>

      <Button onClick={modalWindowHandler} sx={{ mt: 2 }} variant="contained">
        Create Board
      </Button>
      <div className="boards-wrapper">
        {allBoards.length ? (
          allBoards.map((board) => <Board key={board._id} title={board.title} _id={board._id} />)
        ) : (
          <p className="boards-not-found">Boards not found</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default MainPage;
