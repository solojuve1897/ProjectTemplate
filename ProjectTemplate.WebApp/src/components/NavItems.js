import React from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { signoutRedirect, signinRedirect } from '../services/userService';
import { useSelector } from 'react-redux';

export default function NavItems() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  return (
    <div>
      <ListItem
        selected={location.pathname === '/'}
        button
        component={RouterLink}
        to='/'
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>
      {user && (
        <ListItem
          selected={location.pathname === '/todo'}
          button
          component={RouterLink}
          to='/todo'
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary='To-Do Lists' />
        </ListItem>
      )}
      <ListItem
        selected={location.pathname === '/about'}
        button
        component={RouterLink}
        to='/about'
      >
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
