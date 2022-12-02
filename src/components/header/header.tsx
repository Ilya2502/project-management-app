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
import { useSelector, useDispatch } from 'react-redux';
import SelectLang from 'components/select-lang/select-lang';
import { ElevationScrollProps } from './types';
import { setUserToken } from 'features/user/user-slice';
import { userSignOut } from '../service/userService/userService';
import { RootState } from 'share/types';

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
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state: RootState) => state.user.userToken);
  const classes = useStyles();
  const { menuButton, title } = classes;

  const signOutHandler = () => {
    userSignOut();
    dispatch(setUserToken(null));
  };

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
            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
              Kanban
            </NavLink>
          </Typography>
          {isUserLogin ? (
            <ButtonGroup color="inherit" variant="outlined" aria-label="outlined button group">
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/edit-profile">
                <Button sx={{ mr: 1, color: 'white' }}>Edit profile</Button>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/boards">
                <Button sx={{ mr: 1, color: 'white' }}>Boards</Button>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">
                <Button onClick={signOutHandler} sx={{ mr: 1, color: 'white' }}>
                  Sing Out
                </Button>
              </NavLink>
            </ButtonGroup>
          ) : (
            <ButtonGroup color="inherit" variant="outlined" aria-label="outlined button group">
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">
                <Button sx={{ mr: 1, color: 'white' }}>Sing In</Button>
              </NavLink>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/registration">
                <Button sx={{ mr: 1, color: 'white' }}>Sing Up</Button>
              </NavLink>
            </ButtonGroup>
          )}
          <SelectLang />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
