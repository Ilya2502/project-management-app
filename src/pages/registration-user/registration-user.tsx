import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IUserRegistration } from './types';
import { userService } from 'components/service/userService/userService';
import ToastMessage from 'components/UI/toast-message/toast-message';
import { ToastMessageSettings } from 'share/types';
import { RootState } from 'share/types';

const { createUser } = userService;

const RegistrationUser = () => {
  const isUserLogin = useSelector((state: RootState) => state.user.userToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserRegistration>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessageSettings>({
    severity: 'success',
    text: '',
  });

  const toastMessageSet = (severity: 'success' | 'error', text: string) => {
    setToastOpen(true);
    setToastMessage({ severity, text });
  };

  const createNewUser = async (data: IUserRegistration) => {
    const { firstName, login, password } = data;
    const result = await createUser(firstName, login, password);
    if (result?.statusCode === 409) {
      toastMessageSet('error', result.message);
    } else if (result?.name) {
      toastMessageSet('success', `${result.name} successfully registered!`);
    }
  };

  const onSubmit = (data: IUserRegistration) => {
    createNewUser(data);
    reset();
  };

  return (
    <React.Fragment>
      {isUserLogin && <Navigate to="/boards" />}
      <ToastMessage open={toastOpen} setOpen={setToastOpen} message={toastMessage} />

      <div className="user-registration-wrapper">
        <h2 className="user-registration-header">Sign Up</h2>
        <form className="user-registration-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="user-registration-form__label" htmlFor="firstName">
            Name:
            <input
              className="user-registration-form__input"
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

          <label className="user-registration-form__label" htmlFor="registration">
            Login:
            <input
              className="user-registration-form__input"
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

          <label className="user-registration-form__label" htmlFor="password">
            Password:
            <input
              className="user-registration-form__input"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Input your password',
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

          <input className="user-registration-form__submit" type="submit" value={'Submit'} />
        </form>
      </div>
    </React.Fragment>
  );
};

export default RegistrationUser;
