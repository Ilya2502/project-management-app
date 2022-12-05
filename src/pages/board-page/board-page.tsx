import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { AppDispatch } from 'store/store';
import { RootState } from 'share/types';
import { fetchAllColumns } from 'features/column/column-slice';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { ICreateColumn } from './types';
import Column from 'components/column/column';
import { createNewColumn } from 'features/column/column-slice';

const BoardPage = () => {
  const params = useParams();
  const boardId = params.id ?? '';
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const allColumns = useSelector((state: RootState) => state.column.columns);
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateColumn>();

  useEffect(() => {
    dispatch(fetchAllColumns(boardId));
  }, [dispatch, boardId]);

  const modalWindowHandler = () => {
    openModalWindow ? setOpenModalWindow(false) : setOpenModalWindow(true);
  };

  const onSubmit = (data: ICreateColumn) => {
    const { title } = data;
    const order = allColumns.length;
    dispatch(createNewColumn({ boardId, title, order }));
    reset();
    modalWindowHandler();
  };

  return (
    <React.Fragment>
      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="create-column-wrapper">
          <h3 className="create-column-header">{t('Create')}</h3>
          <form className="create-column-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="create-column-form__label" htmlFor="title">
              {`${t('Title')}:`}
              <input
                className="create-column-form__input"
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

            <input
              className="create-column-form__submit"
              type="submit"
              value={`${t('CreateСolumn')}`}
            />
          </form>
        </div>
      </ModalWindow>

      <Button onClick={modalWindowHandler} sx={{ mt: 2 }} variant="contained">
        {t('CreateСolumn')}
      </Button>
      {allColumns.length > 0 && (
        <Button onClick={modalWindowHandler} sx={{ mt: 2, ml: 2 }} variant="contained">
          {t('CreateTask')}
        </Button>
      )}
      <div className="columns-wrapper">
        {allColumns.length ? (
          allColumns.map((column, i) => (
            <Column
              key={column._id}
              title={column.title}
              _id={column._id}
              order={i}
              boardId={boardId}
            />
          ))
        ) : (
          <p className="columns-not-found">{t('columnsNotFound')}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default BoardPage;
