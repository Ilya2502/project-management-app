import { BoardResponseType } from 'components/service/boardService/types';

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
}

export interface ModalWindowProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}
