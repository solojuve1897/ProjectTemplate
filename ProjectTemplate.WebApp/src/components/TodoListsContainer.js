import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as apiService from '../services/apiService';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TodoLists from './TodoLists';
import TodoListsItems from './TodoListsItems';
import Modal from './Modal';

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
  bgSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  bgSuccesLight: {
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
  const formRef = useRef();
  const [selected, setSelected] = useState(data.lists[0]);
  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const addList = (title) => {};

  const updateList = async (title) => {
    setLoading(true);
    const payload = {
      id: selected.id,
      title: title,
    };
    await apiService.updateTodoList(selected.id, payload);
    const listIndex = data.lists.findIndex((list) => list.id === payload.id);
    data.lists[listIndex] = { ...data.lists[listIndex], ...payload };
    setSelected(data.lists[listIndex]);
    setLoading(false);
    setModal(false);
  };

  const toggleTodoItem = (id, done) => {
    const itemIndex = selected.items.findIndex((item) => item.id === id);
    const itemToUpdate = { ...selected.items[itemIndex], done: done };
    apiService.updateTodoItem(id, itemToUpdate).then(() => {
      selected.items[itemIndex] = itemToUpdate;
      setData({ ...data });
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={5}>
        <Grid container justify='flex-end'>
          <Grid item>
            <Button
              onClick={() => {
                setEditMode(false);
                setModal(true);
              }}
              startIcon={<AddIcon />}
            >
              Add list
            </Button>
          </Grid>
        </Grid>
        <TodoLists
          lists={data.lists}
          classes={classes}
          selected={selected}
          setSelected={setSelected}
          openUpdateListModal={() => {
            setEditMode(true);
            setModal(true);
          }}
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
      <Modal
        open={modal}
        handleClose={() => setModal(false)}
        handleSubmit={() => formRef.current.handleSubmit()}
        title={editMode ? 'Edit List' : 'Add List'}
        loading={loading}
      >
        <Formik
          innerRef={formRef}
          initialValues={{
            title: editMode ? selected.title : '',
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Required'),
          })}
          onSubmit={(values) =>
            editMode ? updateList(values.title) : addList(values.title)
          }
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <div style={{ padding: 8 }}>
              <Grid container spacing={4}>
                <Grid xs={12} item>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    label='Title'
                    name='title'
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </Formik>
      </Modal>
    </Grid>
  );
}
