import React, { useEffect } from 'react';
import { signinRedirectCallback } from '../services/userService';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

function SigninOidc() {
  const history = useHistory();
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback();
      history.push('/');
    }
    signinAsync();
  }, [history]);

  return (
    <div>
      <LinearProgress />
    </div>
  );
}

export default SigninOidc;
