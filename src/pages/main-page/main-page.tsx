import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { ICreateBoard } from './types';
import { fetchAllBoards, createNewBoard, searchBoard } from 'features/board/board-slice';
import Board from 'components/board/board';
import { RootState } from 'share/types';
import { AppDispatch } from 'store/store';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(createNewBoard(JSON.stringify(data)));
    reset();
    modalWindowHandler();
  };

  const clickHandler = () => {
    dispatch(searchBoard('check'));
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="create-board-wrapper">
          <form className="create-board-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="create-board-form__label" htmlFor="title">
              {`${t('Title')}:`}
              <input
                className="create-board-form__input"
                type="text"
                placeholder={`${t('Title')}`}
                {...register('title', {
                  required: `${t('inputYourTitle')}:`,
                  minLength: {
                    value: 4,
                    message: `${t('min4Char')}:`,
                  },
                  maxLength: {
                    value: 40,
                    message: `${t('max40Char')}:`,
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
              {`${t('Description')}:`}
              <textarea
                className="create-board-form__textarea"
                placeholder={`${t('Description')}`}
                {...register('description', {
                  required: `${t('inputYourDescription')}`,
                  minLength: {
                    value: 6,
                    message: `${t('min6Char')}:`,
                  },
                  maxLength: {
                    value: 200,
                    message: `${t('max200Char')}:`,
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

            <input
              className="create-board-form__submit"
              type="submit"
              value={`${t('CreateBoard')}`}
            />
          </form>
        </div>
      </ModalWindow>

      <Button onClick={modalWindowHandler} sx={{ mt: 2 }} variant="contained">
        {t('CreateBoard')}
      </Button>
      <div className="boards-wrapper" onClick={clickHandler}>
        {allBoards.length ? (
          allBoards.map((board) => <Board key={board._id} title={board.title} _id={board._id} />)
        ) : (
          <p className="boards-not-found">{t('BoardsNotFound')}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default MainPage;
