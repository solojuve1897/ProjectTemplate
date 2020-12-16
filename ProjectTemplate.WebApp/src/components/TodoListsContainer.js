import React, { useState } from 'react';
import * as apiService from '../services/apiService';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TodoLists from './TodoLists';
import TodoListsItems from './TodoListsItems';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  small: {
    fontSize: 16,
  },
  bgSecondary: {
    backgroundColor: theme.palette.secondary.main,
  },
  bgWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  bgError: {
    backgroundColor: theme.palette.error.main,
  },
  bgPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  bgSucces: {
    backgroundColor: '#cfebd0',
  },
  selected: {
    borderLeft: '5px solid #3f50b6;',
  },
  notSelected: {
    borderLeft: '5px solid #fff',
  },
  subheader: {
    textAlign: 'left',
  },
}));

export default function TodoListsContainer({ setData, data }) {
  const classes = useStyles();
  const [selected, setSelected] = useState(data.lists[0]);

  const toggleTodoItem = (id, done) => {
    const itemIndex = selected.items.findIndex((item) => item.id === id);
    const itemToUpdate = { ...selected.items[itemIndex], done: done };
    apiService.updateTodoItem(id, itemToUpdate).then(() => {
      selected.items[itemIndex] = itemToUpdate;
      setData({ ...data, selected });
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={5}>
        <Grid container justify='flex-end'>
          <Grid item>
            <Button startIcon={<AddIcon />}>Add list</Button>
          </Grid>
        </Grid>
        <TodoLists
          lists={data.lists}
          classes={classes}
          selected={selected}
          setSelected={setSelected}
        />
      </Grid>
      <Grid item xs={12} lg={7}>
        <Grid container justify='flex-end'>
          <Grid item>
            <Button startIcon={<AddIcon />}>Add item</Button>
          </Grid>
        </Grid>
        {selected.items.length > 0 ? (
          <TodoListsItems
            priorityLevels={data.priorityLevels}
            classes={classes}
            selected={selected}
            toggleTodoItem={toggleTodoItem}
          />
        ) : (
          <Typography>This list is empty.</Typography>
        )}
      </Grid>
    </Grid>
  );
}
