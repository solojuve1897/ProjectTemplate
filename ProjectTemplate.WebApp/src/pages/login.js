import React from 'react';
import { signinRedirect } from '../services/userService';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login() {
  const user = useSelector((state) => state.auth.user);

  function login() {
    signinRedirect();
  }

  return user ? (
    <Redirect to={'/'} />
  ) : (
    <div>
      <h1>Hello!</h1>
      <p>Welcome to this web app.</p>
      <p>
        A demo of using React and Identity Server 4 to authenticate a user via
        OpenID Connect to gain access to a web API.
      </p>
      <p>Start by signing in.</p>

      <button onClick={() => login()}>Login</button>
    </div>
  );
}

export default Login;
