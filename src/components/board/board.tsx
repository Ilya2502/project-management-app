import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { BoardProps, IBoardData, IUpdateBoard } from './types';
import { removeBoardById, updateCurrentBoard } from 'features/board/board-slice';
import { AppDispatch } from 'store/store';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { useTranslation } from 'react-i18next';

const Board = (props: BoardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const [openModalWindowDeleteButton, setOpenModalWindowDeleteButton] = useState(false);
  const { title, _id } = props;

  let boardData: IBoardData = { title: title, description: '---' };
  if (title.includes('{')) {
    boardData = JSON.parse(title);
  }

  const deleteBoardHandler = (id: string) => {
    setOpenModalWindowDeleteButton(false);
    dispatch(removeBoardById(id));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateBoard>();

  const modalWindowHandler = () => {
    openModalWindow ? setOpenModalWindow(false) : setOpenModalWindow(true);
  };

  const onSubmit = (data: IUpdateBoard) => {
    const prepareData = JSON.stringify(data);
    dispatch(updateCurrentBoard({ id: _id, title: prepareData }));
    reset();
    modalWindowHandler();
  };

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="board-wrapper">
        {title.includes('{') ? (
          <Fragment>
            <h3 className="board-title">{boardData.title}</h3>
            <p className="board-description">{boardData.description}</p>
          </Fragment>
        ) : (
          <Fragment>
            <h3 className="board-title">{boardData.title}</h3>
            <p className="board-description">{boardData.description}</p>
          </Fragment>
        )}
        <div className="board-buttons">
          <button className="board-buttons__go-board">{t('goBoard')}</button>
          <button
            className="board-buttons__delete"
            onClick={() => setOpenModalWindowDeleteButton(true)}
          >
            Delete
          </button>
          <button className="board-buttons__update" onClick={modalWindowHandler}>
            Update
          </button>
        </div>
      </div>

      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="update-board-wrapper">
          <form className="update-board-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="update-board-form__label" htmlFor="title">
              Update title:
              <input
                className="update-board-form__input"
                type="text"
                placeholder={boardData.title}
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

            <label className="update-board-form__label" htmlFor="description">
              Update description:
              <textarea
                className="update-board-form__textarea"
                placeholder={boardData.description}
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

            <input className="update-board-form__submit" type="submit" value={'Update Board'} />
          </form>
        </div>
      </ModalWindow>
      <ModalWindow open={openModalWindowDeleteButton} setOpen={setOpenModalWindowDeleteButton}>
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
          <h3>Delete board?</h3>
          <ButtonGroup>
            <Button style={{ color: 'red' }} onClick={() => setOpenModalWindowDeleteButton(false)}>
              No
            </Button>
            <Button style={{ color: 'green' }} onClick={() => deleteBoardHandler(_id)}>
              Yes
            </Button>
          </ButtonGroup>
        </Grid>
      </ModalWindow>
    </Fragment>
  );
};

export default Board;
