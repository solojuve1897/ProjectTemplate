import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as apiService from '../services/apiService';
import { prettifyJson } from '../utils/jsonUtils';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  code: {
    textAlign: 'left',
    color: '#fff',
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 20,
  },
}));

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(null);

  async function getData() {
    const result = await apiService.getDataFromApi();
    setData(result);
  }

  const classes = useStyles();

  return (
    <div>
      <h1>Home</h1>
      <p>Hello, {user.profile.name}.</p>
      <p>I have given you a token to call your API</p>

      <p>
        💡 <strong>Tip: </strong>
        <em>
          Use the Redux dev tools and network tab to inspect what user data was
          returned from identity and stored in the client.
        </em>
      </p>
      <Button onClick={() => getData()} variant='contained' color='secondary'>
        Call API
      </Button>
      {data && (
        <pre className={classes.code}>
          <code>{prettifyJson(data)}</code>
        </pre>
      )}
    </div>
  );
}

export default Home;
