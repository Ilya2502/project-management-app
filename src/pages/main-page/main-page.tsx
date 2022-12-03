import React, { useState } from 'react';
import { Button } from '@mui/material';
import ModalWindow from 'components/UI/modal-window/modal-window';

const MainPage = () => {
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const modalWindowHandler = () => {
    openModalWindow ? setOpenModalWindow(false) : setOpenModalWindow(true);
  };

  return (
    <React.Fragment>
      <ModalWindow open={openModalWindow} setOpen={setOpenModalWindow}>
        <div>
          <p>bla-bla</p>
          <button onClick={modalWindowHandler}>Create</button>
        </div>
      </ModalWindow>
      <Button onClick={modalWindowHandler} sx={{ mt: 2 }} variant="contained">
        Create Board
      </Button>
    </React.Fragment>
  );
};

export default MainPage;
