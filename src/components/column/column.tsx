import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IUpdateColumn } from './types';
import { AppDispatch } from 'store/store';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { removeColumnById } from 'features/column/column-slice';
import { ColumnResponseType } from 'components/service/columnsService/types';

const Column = (props: ColumnResponseType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const [openModalWindowDeleteButton, setOpenModalWindowDeleteButton] = useState(false);
  const { title, boardId } = props;
  const columnId = props._id;

  const deleteColumnHandler = () => {
    setOpenModalWindowDeleteButton(false);
    dispatch(removeColumnById({ boardId, columnId }));
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
    // dispatch(updateCurrentcolumn({ id: _id, title: prepareData }));
    console.log(data);
    reset();
    modalWindowHandler();
  };

  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="column-wrapper">
        <div className="column-wrapper-header">
          <div className="column-buttons">
            <button
              className="column-buttons__delete"
              onClick={() => setOpenModalWindowDeleteButton(true)}
            >
              {t('delete')}
            </button>
            <button className="column-buttons__update" onClick={modalWindowHandler}>
              {t('update')}
            </button>
          </div>
          <h3 className="column-title">{title}</h3>
        </div>
      </div>

      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="update-column-wrapper">
          <form className="update-column-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="update-column-form__label" htmlFor="title">
              {t('updateTitle')}
              <input
                className="update-column-form__input"
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
              className="update-column-form__submit"
              type="submit"
              value={`${t('updatecolumn')}`}
            />
          </form>
        </div>
      </ModalWindow>
      <ModalWindow open={openModalWindowDeleteButton} setOpen={setOpenModalWindowDeleteButton}>
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
          <h3>{`${t('deletecolumn')}?`}</h3>
          <ButtonGroup>
            <Button style={{ color: 'red' }} onClick={() => setOpenModalWindowDeleteButton(false)}>
              {t('no')}
            </Button>
            <Button style={{ color: 'green' }} onClick={deleteColumnHandler}>
              {t('yes')}
            </Button>
          </ButtonGroup>
        </Grid>
      </ModalWindow>
    </Fragment>
  );
};

export default Column;
