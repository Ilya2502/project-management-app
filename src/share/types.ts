import { BoardResponseType } from 'components/service/boardService/types';
import { ColumnsInBoardResponseType } from 'components/service/columnsService/types';
import { TaskResponseType } from 'components/service/taskService/types';

export interface ToastMessageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: ToastMessageSettings;
}

export interface ToastMessageSettings {
  severity: 'success' | 'error';
  text: string;
}

export interface RootState {
  user: {
    userToken: string | null;
    userLogin: string | null;
  };
  board: {
    boards: BoardResponseType[] | [];
  };
  column: {
    columns: ColumnsInBoardResponseType[] | [];
  };
  task: {
    tasks: TaskResponseType[] | [];
  };
}

export interface ModalWindowProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}
