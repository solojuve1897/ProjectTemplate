import axios from 'axios';

async function getTodoLists() {
  const response = await axios.get(
    process.env.REACT_APP_WebAPI + '/api/todolists'
  );
  return response.data;
}

async function updateTodoList(id, data) {
  const response = await axios.put(
    process.env.REACT_APP_WebAPI + '/api/todolists/' + id,
    data
  );
  return response.data;
}

async function updateTodoItem(id, data) {
  const response = await axios.put(
    process.env.REACT_APP_WebAPI + '/api/todoitems/' + id,
    data
  );
  return response.data;
}

export { getTodoLists, updateTodoList, updateTodoItem };
