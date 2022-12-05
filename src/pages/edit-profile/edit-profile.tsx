import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { IUserEdit } from './types';
import { userService } from 'components/service/userService/userService';
import ToastMessage from 'components/UI/toast-message/toast-message';
import { ToastMessageSettings } from 'share/types';
import { RootState } from 'share/types';
import { setUserLogin, setUserToken } from 'features/user/user-slice';
import ModalWindow from 'components/UI/modal-window/modal-window';
import { useTranslation } from 'react-i18next';

const { updateUserById, deleteUserById } = userService;

const EditProfile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const [openModalWindowDeleteButton, setOpenModalWindowDeleteButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserEdit>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessageSettings>({
    severity: 'success',
    text: '',
  });

  const toastMessageSet = (severity: 'success' | 'error', text: string) => {
    setToastOpen(true);
    setToastMessage({ severity, text });
  };

  const createNewUser = async (data: IUserEdit) => {
    const { firstName, login, password } = data;
    const result = await updateUserById(firstName, login, password);
    if (result?.statusCode === 409) {
      toastMessageSet('error', result.message);
    } else if (result?.name) {
      toastMessageSet('success', `${result.name} successfully updated!`);
      dispatch(setUserLogin(result.login));
    }
  };

  const onSubmit = (data: IUserEdit) => {
    createNewUser(data);
    reset();
  };

  const deleteUser = () => {
    deleteUserById();
    dispatch(setUserLogin(null));
    dispatch(setUserToken(null));
    setOpenModalWindowDeleteButton(false);
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <ToastMessage open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
      <div className="user-edit-wrapper">
        <h2 className="user-edit-login">
          {userLogin} {t('EditProfile').toLowerCase()}
        </h2>
        <form className="user-edit-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="user-edit-form__label" htmlFor="firstName">
            {`${t('Name')}:`}
            <input
              className="user-edit-form__input"
              type="text"
              placeholder={`${t('Name')}`}
              {...register('firstName', {
                required: `${t('inputYourName')}`,
                minLength: {
                  value: 2,
                  message: `${t('min2Char')}`,
                },
                maxLength: {
                  value: 16,
                  message: `${t('max16Char')}`,
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{2,16}$/,
                  message: `${t('latinCharNoSpaces')}`,
                },
              })}
            />
            {errors?.firstName?.type === 'required' && (
              <span className="error">{errors?.firstName?.message}</span>
            )}
            {errors?.firstName?.type === 'minLength' && (
              <span className="error">{errors?.firstName?.message}</span>
            )}
            {errors?.firstName?.type === 'maxLength' && (
              <span className="error">{errors?.firstName?.message}</span>
            )}
            {errors?.firstName?.type === 'pattern' && (
              <span className="error">{errors?.firstName?.message}</span>
            )}
          </label>

          <label className="user-edit-form__label" htmlFor="edit">
            {`${t('Login')}:`}
            <input
              className="user-edit-form__input"
              type="text"
              placeholder={`${t('Login')}`}
              {...register('login', {
                required: `${t('inputYourLogin')}`,
                minLength: {
                  value: 2,
                  message: `${t('min2Char')}`,
                },
                maxLength: {
                  value: 16,
                  message: `${t('max16Char')}`,
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{2,16}$/,
                  message: `${t('latinCharNoSpaces')}`,
                },
              })}
            />
            {errors?.login?.type === 'required' && (
              <span className="error">{errors?.login?.message}</span>
            )}
            {errors?.login?.type === 'minLength' && (
              <span className="error">{errors?.login?.message}</span>
            )}
            {errors?.login?.type === 'maxLength' && (
              <span className="error">{errors?.login?.message}</span>
            )}
            {errors?.login?.type === 'pattern' && (
              <span className="error">{errors?.login?.message}</span>
            )}
          </label>

          <label className="user-edit-form__label" htmlFor="password">
            {`${t('password')}:`}
            <input
              className="user-edit-form__input"
              type="password"
              placeholder={`${t('New')} ${t('password')}`}
              {...register('password', {
                required: `${t('InputNewPassword')}`,
                minLength: {
                  value: 6,
                  message: `${t('min6Char')}`,
                },
                maxLength: {
                  value: 16,
                  message: `${t('max16Char')}`,
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{6,16}$/,
                  message: `${t('latinCharNoSpaces')}`,
                },
              })}
            />
            {errors?.password?.type === 'required' && (
              <span className="error">{errors?.password?.message}</span>
            )}
            {errors?.password?.type === 'minLength' && (
              <span className="error">{errors?.password?.message}</span>
            )}
            {errors?.password?.type === 'maxLength' && (
              <span className="error">{errors?.password?.message}</span>
            )}
            {errors?.password?.type === 'pattern' && (
              <span className="error">{errors?.password?.message}</span>
            )}
          </label>

          <input className="user-edit-form__submit" type="submit" value={`${t('UpdateProfile')}`} />
        </form>
        <button onClick={() => setOpenModalWindowDeleteButton(true)} className="user-edit-delete">
          {t('DeleteUser')}
        </button>
      </div>
      <ModalWindow open={openModalWindowDeleteButton} setOpen={setOpenModalWindowDeleteButton}>
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
          <h3>
            {t('delete')} {userLogin}?
          </h3>
          <ButtonGroup>
            <Button style={{ color: 'red' }} onClick={() => setOpenModalWindowDeleteButton(false)}>
              {t('no')}
            </Button>
            <NavLink style={{ textDecoration: 'none' }} to="/">
              <Button style={{ color: 'green' }} onClick={deleteUser}>
                {t('yes')}
              </Button>
            </NavLink>
          </ButtonGroup>
        </Grid>
      </ModalWindow>
    </React.Fragment>
  );
};

export default EditProfile;
