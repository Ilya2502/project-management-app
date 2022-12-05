import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ICreateTask } from './types';
import { AppDispatch } from 'store/store';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { removeColumnById, updateCurrentColumn } from 'features/column/column-slice';
import { ColumnResponseType } from 'components/service/columnsService/types';
// import Task from 'components/task/task';
// import { RootState } from 'share/types';
// import { fetchColumnTasks, createNewTask } from 'features/task/task-slice';

const Column = (props: ColumnResponseType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const [openModalWindowDeleteButton, setOpenModalWindowDeleteButton] = useState(false);
  const { title, boardId, order } = props;
  const columnId = props._id;
  const [changeTitle, setChangeTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  // const columnTasks = useSelector((state: RootState) => state.task.tasks);
  // const columnTasks = [];

  // console.log('---');
  // console.log(columnTasks);
  // console.log(columnId);
  // console.log('---');

  // useEffect(() => {
  //   dispatch(fetchColumnTasks({ boardId, columnId }));
  // }, [dispatch, boardId, columnId]);

  const deleteColumnHandler = () => {
    setOpenModalWindowDeleteButton(false);
    dispatch(removeColumnById({ boardId, columnId }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateTask>();

  const modalWindowHandler = () => {
    openModalWindow ? setOpenModalWindow(false) : setOpenModalWindow(true);
  };

  const onSubmit = (data: ICreateTask) => {
    // const prepareData = JSON.stringify(data);
    // dispatch(updateCurrentcolumn({ id: _id, title: prepareData }));
    // const order = columnTasks.length;
    // const { title, description } = data;
    // dispatch(createNewTask({ boardId, columnId, title, order, description }));
    reset();
    modalWindowHandler();
  };

  const { t } = useTranslation();

  const titleHandler = () => {
    setChangeTitle(true);
  };

  const inputHandlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const changeTitileHandler = () => {
    setChangeTitle(false);
    const title = inputTitle;
    dispatch(updateCurrentColumn({ boardId, columnId, title, order }));
  };

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
            <button className="column-buttons__create-task" onClick={modalWindowHandler}>
              Create task
            </button>
          </div>
          {!changeTitle ? (
            <h3 className="column-title" onClick={titleHandler}>
              {title}
            </h3>
          ) : (
            <div className="update-title-field">
              <input placeholder="change title" onChange={(e) => inputHandlerTitle(e)} />
              <button onClick={changeTitileHandler}>✔</button>
              <button onClick={() => setChangeTitle(false)}>✖</button>
            </div>
          )}
        </div>
        {/* {columnTasks.length ? (
          columnTasks.map((task) => (
            <Task
              key={task._id}
              title={task.title}
              _id={task._id}
              order={task.order}
              boardId={boardId}
              columnId={columnId}
              description={task.description}
              userId={task.userId}
              users={task.users}
            />
          ))
        ) : (
          )} */}
        <p className="tasks-not-found">Tasks not found</p>
      </div>

      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div className="update-column-wrapper">
          <form className="update-column-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="update-column-form__label" htmlFor="title">
              {t('Title')}
              <input
                className="update-column-form__input"
                type="text"
                placeholder={`${t('Title')}`}
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

            <label className="update-column-form__label" htmlFor="description">
              {`${t('Description')}:`}
              <textarea
                className="update-column-form__textarea"
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

            <input className="update-column-form__submit" type="submit" value={'Create Task'} />
          </form>
        </div>
      </ModalWindow>
      <ModalWindow open={openModalWindowDeleteButton} setOpen={setOpenModalWindowDeleteButton}>
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
          <h3>{`${t('deleteСolumn')}?`}</h3>
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
