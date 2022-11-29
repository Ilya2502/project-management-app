import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Button, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import SelectLang from 'components/select-lang/select-lang';

const useStyles = makeStyles(() => ({
  header: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { header, menuButton, title } = classes;
  return (
    <header className={header}>
      <AppBar position="sticky" sx={{ pt: 1, pb: 1 }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className={menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" className={title}>
            Kanban
          </Typography>
          <SelectLang />
          <ButtonGroup color="inherit" variant="outlined" aria-label="outlined button group">
            <Button>Sing In</Button>
            <Button>Sing Up</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
