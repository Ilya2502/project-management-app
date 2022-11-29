import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style/index.scss';
import App from './components/app/App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import { userService } from 'components/service/userService/userService';
// import { boardService } from 'components/service/boardService/boardService';
// import { columnsService } from 'components/service/columnsService/columnsService';
// import { taskService } from 'components/service/taskService/taskService';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const checkToken = async () => {
  // await userService.createUser('gavr3', 'gavr3', '12345678');
  // await userService.loginUser('gavr3', '12345678');
  // await userService.getAllUsers();
  // await userService.getUserById();
  // await boardService.createBoard('check3');
  // await boardService.getAllBoards();
  // await boardService.getBoardById('6385f7c6245269da1132257d');
  // await boardService.deleteBoardById('6385f7c6245269da1132257d');
  // await boardService.updateBoardById('6385e06c245269da11322551', 'update board title', ['aa update', 'bb update']);
  // await boardService.getBoardsByUserId();
  // await columnsService.createColumn('6385ec14245269da11322557', 'third column', 2);
  // await columnsService.getColumnsInBoard('6385ec14245269da11322557');
  // await columnsService.getColumnById('6385ec14245269da11322557', '638631ab245269da11322606');
  // await columnsService.updateColumnById(
  //   '6385ec14245269da11322557',
  //   '638631ab245269da11322606',
  //   'update first column',
  //   1
  // );
  // await columnsService.deleteColumnById('6385ec14245269da11322557', '638631ab245269da11322606');
  // await columnsService.getColumnsByUserId();
  // await taskService.getTasksInColumn('6385ec14245269da11322557', '63865c41245269da11322629');
  // await taskService.createTask(
  //   '6385ec14245269da11322557',
  //   '63865c41245269da11322629',
  //   'third Task',
  //   2,
  //   'to do third'
  // );
  // await taskService.getTaskById(
  //   '6385ec14245269da11322557',
  //   '63865c41245269da11322629',
  //   '6386605f245269da11322641'
  // );
  // await taskService.updateTaskById(
  //   '6385ec14245269da11322557',
  //   '63865c41245269da11322629',
  //   '6386605f245269da11322641',
  //   {
  //     title: 'Task update',
  //     order: 99,
  //     description: 'update description',
  //     columnId: '63865c59245269da11322630',
  //   }
  // );
  // await taskService.deleteTaskById(
  //   '6385ec14245269da11322557',
  //   '63865c41245269da11322629',
  //   '638660c6245269da11322650'
  // )
  // await taskService.getTasksByUserId();
  // await taskService.getTasksByBoardId('6385ec14245269da11322557');
// };

// checkToken();
