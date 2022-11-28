import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style/index.scss';
import App from './components/app/App';
// import { getAllUsers, createUser, loginUser } from 'components/service/user-service/user-service';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const checkToken = async () => {
//   createUser('gavr3', 'gavr3', '12345678');
//   await loginUser('gavr', '12345678');
//   getAllUsers();
// };

// checkToken();
