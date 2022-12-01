import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUserLogin } from './types';
import { userService } from 'components/service/userService/userService';
import ToastMessage from 'components/UI/toast-message/toast-message';
import { ToastMessageSettings } from 'share/types';

const { loginUser } = userService;

const Userlogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserLogin>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessageSettings>({
    severity: 'success',
    text: '',
  });

  const toastMessageSet = (severity: 'success' | 'error', text: string) => {
    setToastOpen(true);
    setToastMessage({ severity, text });
  };

  const loginNewUser = async (data: IUserLogin) => {
    const { login, password } = data;
    const result = await loginUser(login, password);
    if (result?.statusCode === 401) {
      toastMessageSet('error', result.message);
    } else {
      toastMessageSet('success', `${data.login} hello!`);
    }
  };

  const onSubmit = (data: IUserLogin) => {
    loginNewUser(data);
    reset();
  };

  return (
    <div className="user-login-wrapper">
      <ToastMessage open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
      <form className="user-login-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="user-login-form__label" htmlFor="login">
          Login:
          <input
            className="user-login-form__input"
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

        <label className="user-login-form__label" htmlFor="password">
          Password:
          <input
            className="user-login-form__input"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Input your name',
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

        <input className="user-login-form__submit" type="submit" value={'Submit'} />
      </form>
    </div>
  );
};

export default Userlogin;
