import React, { useEffect, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/header/header';
import WelcomePage from 'pages/welcome-page/welcome-page';
import Footer from 'components/footer/footer';
import Page404 from 'pages/404/404';
import RegistrationUser from 'pages/registration-user/registration-user';
import UserLogin from 'pages/user-login/user-login';
import { setUserToken } from 'features/user/user-slice';
import { getLocalStorageItem } from 'components/service/localStorageService/localStorageService';
import Boards from 'pages/boards/boards';
import EditProfile from 'pages/edit-profile/edit-profile';
import { RootState } from 'share/types';

const App = () => {
  const dispatch = useDispatch();
  const isUserLoginNow = useSelector((state: RootState) => state.user.userToken);

  const isUserLogin = useCallback(() => {
    const token = getLocalStorageItem('token');
    dispatch(setUserToken(token));
  }, [dispatch]);

  useEffect(() => {
    isUserLogin();
  });

  return (
    <div className="App">
      <Header />
      <main className="main">
        {isUserLoginNow ? (
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/notFound" element={<Page404 heading="Error 404" />} />
            <Route path="/*" element={<Navigate to="/notFound" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/registration" element={<RegistrationUser />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/notFound" element={<Page404 heading="Error 404" />} />
            <Route path="/*" element={<Navigate to="/notFound" />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
