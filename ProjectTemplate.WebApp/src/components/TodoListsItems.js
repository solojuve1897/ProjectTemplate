import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function TodoListsItems({ selected, priorityLevels, classes }) {
  const getPriorityIcon = (val) => {
    switch (val) {
      case 0:
        return <FiberManualRecordIcon />;
      case 1:
        return <ArrowDownwardIcon />;
      case 2:
        return <ArrowForwardIcon />;
      case 3:
        return <ArrowUpwardIcon />;
      default:
        break;
    }
  };

  const getPriorityClass = (val) => {
    switch (val) {
      case 1:
        return classes.bgWarning;
      case 2:
        return classes.bgPrimary;
      case 3:
        return classes.bgError;
      default:
        break;
    }
  };

  return (
    <List
      subheader={
        <ListSubheader className={classes.subheader}>Items</ListSubheader>
      }
      className={classes.root}
    >
      {selected.items.map((item) => {
        return (
          <ListItem
            key={item.id}
            className={item.done ? classes.bgSucces : ''}
            dense
          >
            <ListItemAvatar>
              <Avatar
                alt={priorityLevels[item.priority]}
                title={priorityLevels[item.priority]}
                className={clsx(classes.small, getPriorityClass(item.priority))}
              >
                {getPriorityIcon(item.priority)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={item.note ? item.note : 'No desc.'}
            />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='action'>
                {item.done ? <CloseIcon /> : <DoneIcon />}
              </IconButton>
              <IconButton edge='end' aria-label='delete'>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}