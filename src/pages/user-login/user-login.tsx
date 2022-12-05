import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IUserLogin } from './types';
import { userService } from 'components/service/userService/userService';
import ToastMessage from 'components/UI/toast-message/toast-message';
import { ToastMessageSettings } from 'share/types';
import { getLocalStorageItem } from 'components/service/localStorageService/localStorageService';
import { setUserToken, setUserLogin } from 'features/user/user-slice';
import { RootState } from 'share/types';
import { useTranslation } from 'react-i18next';

const { loginUser } = userService;

const Userlogin = () => {
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state: RootState) => state.user.userToken);
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
      const token = getLocalStorageItem('token');
      const decodedToken = getLocalStorageItem('decodedToken');
      dispatch(setUserToken(token));
      dispatch(setUserLogin(decodedToken.login));
    }
  };

  const onSubmit = (data: IUserLogin) => {
    loginNewUser(data);
    reset();
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <ToastMessage open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
      {isUserLogin && <Navigate to="/main" />}
      <div className="user-login-wrapper">
        <h2 className="user-login-header">{t('SignIn')}</h2>
        <form className="user-login-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="user-login-form__label" htmlFor="login">
            {`${t('Login')}:`}
            <input
              className="user-login-form__input"
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

          <label className="user-login-form__label" htmlFor="password">
            {`${t('password')}:`}
            <input
              className="user-login-form__input"
              type="password"
              placeholder={`${t('password')}`}
              {...register('password', {
                required: `${t('InputYourPassword')}`,
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

          <input className="user-login-form__submit" type="submit" value={`${t('Submit')}`} />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Userlogin;
