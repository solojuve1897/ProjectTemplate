import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { signoutRedirect, signinRedirect } from '../services/userService';
import { useSelector } from 'react-redux';

export default function NavItems() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <ListItem button component={RouterLink} to='/'>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>
      <ListItem button component={RouterLink} to='/about'>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary='About' />
      </ListItem>
      {!user ? (
        <ListItem button onClick={signinRedirect}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary='Sign In' />
        </ListItem>
      ) : (
        <ListItem button onClick={signoutRedirect}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary='Sign Out' />
        </ListItem>
      )}
    </div>
  );
}