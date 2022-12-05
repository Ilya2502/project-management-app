import React, { Fragment, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { ColumnProps, IUpdateColumn } from './types';
// import { AppDispatch } from 'store/store';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { useTranslation } from 'react-i18next';

const Column = (props: ColumnProps) => {
  // const dispatch = useDispatch<AppDispatch>();
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const [openModalWindowDeleteButton, setOpenModalWindowDeleteButton] = useState(false);
  const { title, _id } = props;

  const deleteBoardHandler = (id: string) => {
    setOpenModalWindowDeleteButton(false);
    console.log(id);
    // dispatch(removeBoardById(id));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateColumn>();

  const modalWindowHandler = () => {
    openModalWindow ? setOpenModalWindow(false) : setOpenModalWindow(true);
  };

  const onSubmit = (data: IUpdateColumn) => {
    // const prepareData = JSON.stringify(data);
    // dispatch(updateCurrentBoard({ id: _id, title: prepareData }));
    console.log(data);
    reset();
    modalWindowHandler();
  };

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="board-wrapper">
        <h3 className="board-title">{title}</h3>
        <div className="board-buttons">
          <button
            className="board-buttons__delete"
            onClick={() => setOpenModalWindowDeleteButton(true)}
          >
            {t('delete')}
          </button>
          <button className="board-buttons__update" onClick={modalWindowHandler}>
            {t('update')}
          </button>
        </div>
      </div>

      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="update-board-wrapper">
          <form className="update-board-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="update-board-form__label" htmlFor="title">
              {t('updateTitle')}
              <input
                className="update-board-form__input"
                type="text"
                placeholder={title}
                {...register('title', {
                  required: `${t('inputYourTitle')}`,
                  minLength: {
                    value: 4,
                    message: `${t('min4Char')}`,
                  },
                  maxLength: {
                    value: 40,
                    message: `${t('max40Char')}`,
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

            <input
              className="update-board-form__submit"
              type="submit"
              value={`${t('updateBoard')}`}
            />
          </form>
        </div>
      </ModalWindow>
      <ModalWindow open={openModalWindowDeleteButton} setOpen={setOpenModalWindowDeleteButton}>
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
          <h3>{`${t('deleteBoard')}?`}</h3>
          <ButtonGroup>
            <Button style={{ color: 'red' }} onClick={() => setOpenModalWindowDeleteButton(false)}>
              {t('no')}
            </Button>
            <Button style={{ color: 'green' }} onClick={() => deleteBoardHandler(_id)}>
              {t('yes')}
            </Button>
          </ButtonGroup>
        </Grid>
      </ModalWindow>
    </Fragment>
  );
};

export default Column;
