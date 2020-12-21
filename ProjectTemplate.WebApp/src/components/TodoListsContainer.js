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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
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
  const listItemFormRef = useRef();
  const listFormRef = useRef();
  const [selectedList, setSelectedList] = useState(data.lists[0]);
  const [selectedListItem, setSelectedListItem] = useState({});
  const [listModal, setListModal] = useState(false);
  const [listItemModal, setListItemModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const addList = async (title) => {
    setLoading(true);
    const payload = {
      title: title,
    };
    const listToAdd = await apiService.addTodoList(payload);
    data.lists.unshift(listToAdd);
    setData({ ...data });
    setSelectedList(data.lists[0]);
    setLoading(false);
    setListModal(false);
  };

  const updateList = async (title) => {
    setLoading(true);
    const payload = {
      id: selectedList.id,
      title: title,
    };
    await apiService.updateTodoList(selectedList.id, payload);
    const listIndex = data.lists.findIndex((list) => list.id === payload.id);
    data.lists[listIndex] = { ...data.lists[listIndex], ...payload };
    setSelectedList(data.lists[listIndex]);
    setLoading(false);
    setListModal(false);
  };

  const deleteList = async () => {
    setLoading(true);
    await apiService.deleteTodoList(selectedList.id);
    const listIndex = data.lists.findIndex(
      (list) => list.id === selectedList.id
    );
    data.lists.splice(listIndex, 1);
    setData({ ...data });
    setSelectedList(data.lists[0]);
    setLoading(false);
    setListModal(false);
  };

  const toggleListItem = (id, done) => {
    const itemIndex = selectedList.items.findIndex((item) => item.id === id);
    const itemToUpdate = { ...selectedList.items[itemIndex], done: done };
    apiService.updateTodoItem(id, itemToUpdate).then(() => {
      selectedList.items[itemIndex] = itemToUpdate;
      setData({ ...data });
    });
  };

  const updateListItem = async (payload) => {
    setLoading(true);
    const itemIndex = selectedList.items.findIndex(
      (item) => item.id === selectedListItem.id
    );
    const itemToUpdate = { ...selectedList.items[itemIndex], ...payload };
    itemToUpdate.priority = parseInt(itemToUpdate.priority);
    await apiService.updateTodoItemDetails(selectedListItem.id, itemToUpdate);
    selectedList.items[itemIndex] = itemToUpdate;
    setData({ ...data });
    setLoading(false);
    setListItemModal(false);
  };

  const addListItem = async (payload) => {
    setLoading(true);
    payload = {
      listId: selectedList.id,
      ...payload,
    };
    const listItemToAdd = await apiService.addTodoItem(payload);
    const listIndex = data.lists.findIndex(
      (list) => list.id === selectedList.id
    );
    data.lists[listIndex].items.unshift(listItemToAdd);
    setData({ ...data });
    setLoading(false);
    setListItemModal(false);
  };

  const deleteListItem = async (id) => {
    setLoading(true);
    const itemIndex = selectedList.items.findIndex((item) => item.id === id);
    await apiService.deleteTodoItem(id);
    selectedList.items.splice(itemIndex, 1);
    setData({ ...data });
    setLoading(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={5}>
        <Grid container justify='flex-end'>
          <Grid item>
            <Button
              onClick={() => {
                setEditMode(false);
                setListModal(true);
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
          selected={selectedList}
          setSelected={setSelectedList}
          openUpdateListModal={() => {
            setEditMode(true);
            setListModal(true);
          }}
          deleteList={deleteList}
        />
      </Grid>
      <Grid item xs={12} lg={7}>
        <Grid container justify='flex-end'>
          <Grid item>
            <Button
              onClick={() => {
                setEditMode(false);
                setListItemModal(true);
              }}
              startIcon={<AddIcon />}
            >
              Add item
            </Button>
          </Grid>
        </Grid>
        {selectedList.items.length > 0 ? (
          <TodoListsItems
            priorityLevels={data.priorityLevels}
            classes={classes}
            selectedList={selectedList}
            openUpdateListItemModal={(item) => {
              setSelectedListItem(item);
              setEditMode(true);
              setListItemModal(true);
            }}
            toggleListItem={toggleListItem}
            deleteListItem={deleteListItem}
          />
        ) : (
          <Typography>This list is empty.</Typography>
        )}
      </Grid>
      <Modal
        open={listModal}
        handleClose={() => setListModal(false)}
        handleSubmit={() => listFormRef.current.handleSubmit()}
        title={editMode ? 'Edit List' : 'Add List'}
        loading={loading}
      >
        <Formik
          innerRef={listFormRef}
          initialValues={{
            title: editMode ? selectedList.title : '',
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
      <Modal
        open={listItemModal}
        handleClose={() => setListItemModal(false)}
        handleSubmit={() => listItemFormRef.current.handleSubmit()}
        title={editMode ? 'Edit Item' : 'Add Item'}
        loading={loading}
      >
        <Formik
          innerRef={listItemFormRef}
          initialValues={{
            title: editMode ? selectedListItem.title : '',
            priority: editMode ? selectedListItem.priority : '',
            note: editMode ? selectedListItem.note ?? '' : '',
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Required'),
            priority: Yup.number().required('Required'),
          })}
          onSubmit={(values) =>
            editMode ? updateListItem(values) : addListItem(values)
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
                <Grid xs={12} item>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.priority && errors.priority)}
                  >
                    <InputLabel>Priority</InputLabel>
                    <Select
                      style={{ textAlign: 'left' }}
                      value={values.priority}
                      name='priority'
                      onChange={handleChange}
                    >
                      {Object.keys(data.priorityLevels).map((key) => {
                        return (
                          <MenuItem key={key} value={key}>
                            {data.priorityLevels[key]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {Boolean(touched.priority && errors.priority) && (
                      <FormHelperText>Required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label='Note'
                    name='note'
                    multiline
                    rowsMax={4}
                    rows={4}
                    value={values.note}
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
