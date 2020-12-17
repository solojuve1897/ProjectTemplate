import axios from 'axios';

async function getTodoLists() {
  const response = await axios.get(
    process.env.REACT_APP_WebAPI + '/api/todolists'
  );
  return response.data;
}

async function updateTodoList(id, payload) {
  const response = await axios.put(
    process.env.REACT_APP_WebAPI + '/api/todolists/' + id,
    payload
  );
  return response.data;
}

async function addTodoList(payload) {
  const response = await axios.post(
    process.env.REACT_APP_WebAPI + '/api/todolists',
    payload
  );
  return response.data;
}

async function deleteTodoList(id) {
  const response = await axios.delete(
    process.env.REACT_APP_WebAPI + '/api/todolists/' + id
  );
  return response.data;
}

async function updateTodoItem(id, payload) {
  const response = await axios.put(
    process.env.REACT_APP_WebAPI + '/api/todoitems/' + id,
    payload
  );
  return response.data;
}

export {
  getTodoLists,
  updateTodoList,
  addTodoList,
  deleteTodoList,
  updateTodoItem,
};
