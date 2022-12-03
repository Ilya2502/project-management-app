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
}

export interface ModalWindowProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}
