import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IUserEdit } from './types';
import { userService } from 'components/service/userService/userService';
import ToastMessage from 'components/UI/toast-message/toast-message';
import { ToastMessageSettings } from 'share/types';
import { RootState } from 'share/types';
import { setUserLogin, setUserToken } from 'features/user/user-slice';

const { updateUserById, deleteUserById } = userService;

const EditProfile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user.userLogin);
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
  };

  return (
    <React.Fragment>
      <ToastMessage open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
      <div className="user-edit-wrapper">
        <h2 className="user-edit-login">{userLogin} edit profile</h2>
        <form className="user-edit-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="user-edit-form__label" htmlFor="firstName">
            Name:
            <input
              className="user-edit-form__input"
              type="text"
              placeholder="Name"
              {...register('firstName', {
                required: 'Input your name',
                minLength: {
                  value: 2,
                  message: 'minimum of 2 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'maximum of 16 characters',
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{2,16}$/,
                  message: 'latin characters, no spaces',
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
            Login:
            <input
              className="user-edit-form__input"
              type="text"
              placeholder="Login"
              {...register('login', {
                required: 'Input your login',
                minLength: {
                  value: 2,
                  message: 'minimum of 2 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'maximum of 16 characters',
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{2,16}$/,
                  message: 'latin characters, no spaces',
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
            Password:
            <input
              className="user-edit-form__input"
              type="password"
              placeholder="New password"
              {...register('password', {
                required: 'Input your new password',
                minLength: {
                  value: 6,
                  message: 'minimum of 6 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'maximum of 16 characters',
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{6,16}$/,
                  message: 'latin characters, no spaces',
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

          <input className="user-edit-form__submit" type="submit" value={'Update profile'} />
        </form>
        <NavLink to="/">
          <button onClick={deleteUser} className="user-edit-delete">
            Delete user
          </button>
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;
