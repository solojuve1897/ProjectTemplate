import React from 'react';
import clsx from 'clsx';
import { formatDateTime } from '../utils/dates';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import ListSubheader from '@material-ui/core/ListSubheader';

export default function TodoLists({ lists, selected, setSelected, classes }) {
  return (
    <List
      subheader={
        <ListSubheader className={classes.subheader}>Lists</ListSubheader>
      }
      className={classes.root}
    >
      {lists.map((list) => {
        const itemsCount = list.items.filter((item) => !item.done).length;
        return (
          <div key={list.id}>
            <ListItem
              className={
                selected.id === list.id ? classes.selected : classes.notSelected
              }
              dense
              button
              onClick={() => setSelected(list)}
            >
              <ListItemAvatar>
                <Avatar className={clsx(classes.small, classes.bgSecondary)}>
                  {itemsCount}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={list.title}
                secondary={formatDateTime(list.lastModified)}
              />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        );
      })}
    </List>
  );
}
