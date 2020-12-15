import React from 'react';

function About() {
  return (
    <div>
      <h1>About this app</h1>
      <p>
        It's developed with React using{' '}
        <a
          href='https://github.com/facebook/create-react-app'
          target='_blank'
          rel='noreferrer'
        >
          create-react-app
        </a>{' '}
        and heavly uses the library of{' '}
        <a href='https://material-ui.com' target='_blank' rel='noreferrer'>
          Material UI
        </a>{' '}
        for content and styling.{' '}
        <a href='https://redux.js.org' target='_blank' rel='noreferrer'>
          Redux
        </a>{' '}
        is used for state management.
      </p>
      <p>
        For handling HTTP requests{' '}
        <a
          href='https://github.com/axios/axios'
          target='_blank'
          rel='noreferrer'
        >
          Axios
        </a>{' '}
        is used.
      </p>
      <p>
        To sign in to the app a local{' '}
        <a
          href='https://identityserver4.readthedocs.io'
          target='_blank'
          rel='noreferrer'
        >
          IdentityServer 4
        </a>{' '}
        instance is used which authenticates the user via OpenID Connect.
      </p>
      <p>
        The app can be built for three different environments:{' '}
        <strong>production</strong>, <strong>staging</strong> &{' '}
        <strong>develop</strong>.
      </p>
    </div>
  );
}

export default About;
