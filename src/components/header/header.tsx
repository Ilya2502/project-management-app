import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import SelectLang from 'components/select-lang/select-lang';
import { ElevationScrollProps } from './types';

const ElevationScroll = (props: ElevationScrollProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 8 : 0,
    style: {
      backgroundColor: trigger ? '#1669bc' : '#1976d2',
      transition: trigger ? '0.3s' : '0.5s',
    },
  });
};

const useStyles = makeStyles(() => ({
  menuButton: {
    marginRight: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { menuButton, title } = classes;
  return (
    <ElevationScroll>
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
            <NavLink to="/">Kanban</NavLink>
          </Typography>
          <SelectLang />
          <ButtonGroup color="inherit" variant="outlined" aria-label="outlined button group">
            <NavLink to="/login">
              <Button sx={{ mr: 1, color: 'white' }}>Sing In</Button>
            </NavLink>
            <NavLink to="/registration">
              <Button>Sing Up</Button>
            </NavLink>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
