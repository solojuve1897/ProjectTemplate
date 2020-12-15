import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login() {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <Redirect to={'/'} />
  ) : (
    <div>
      <h1>Hello</h1>
      <p>Welcome to this web app.</p>
      <p>Start by signing in.</p>
    </div>
  );
}

export default Login;
