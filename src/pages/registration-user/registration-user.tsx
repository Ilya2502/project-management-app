import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IUserRegistration } from './types';
import { userService } from 'components/service/userService/userService';
import ToastMessage from 'components/UI/toast-message/toast-message';
import { ToastMessageSettings } from 'share/types';
import { RootState } from 'share/types';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <React.Fragment>
      {isUserLogin && <Navigate to="/main" />}
      <ToastMessage open={toastOpen} setOpen={setToastOpen} message={toastMessage} />

      <div className="user-registration-wrapper">
        <h2 className="user-registration-header">{t('SignUp')}</h2>
        <form className="user-registration-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="user-registration-form__label" htmlFor="firstName">
            {`${t('Name')}:`}
            <input
              className="user-registration-form__input"
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

          <label className="user-registration-form__label" htmlFor="registration">
            {`${t('Login')}:`}
            <input
              className="user-registration-form__input"
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

          <label className="user-registration-form__label" htmlFor="password">
            {`${t('password')}:`}
            <input
              className="user-registration-form__input"
              type="password"
              placeholder={`${t('password')}`}
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

          <input
            className="user-registration-form__submit"
            type="submit"
            value={`${t('Submit')}`}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default RegistrationUser;
