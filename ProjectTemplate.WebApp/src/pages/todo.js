import React, { useState, useEffect } from 'react';
import * as apiService from '../services/apiService';
import TodoListsContainer from '../components/TodoListsContainer';
import { LinearProgress } from '@material-ui/core';

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const result = await apiService.getTodoLists();
      setData(result);
    }
    getData();
  }, []);

  return (
    <div>
      {!data ? (
        <LinearProgress />
      ) : (
        <div>
          <h1>To-Do Lists</h1>
          <TodoListsContainer setData={setData} data={data} />
        </div>
      )}
    </div>
  );
}

export default About;
