import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SigninOidc from './pages/signin-oidc';
import SignoutOidc from './pages/signout-oidc';
import Home from './pages/home';
import Todo from './pages/todo';
import About from './pages/about';
import Login from './pages/login';
import { Provider } from 'react-redux';
import store from './store';
import userManager, { loadUserFromStorage } from './services/userService';
import AuthProvider from './utils/authProvider';
import PrivateRoute from './utils/protectedRoute';
import DashboardLayout from './components/DashboardLayout';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

loadUserFromStorage(store);

function App() {
  const theme = createMuiTheme({
    typography: {
      fontSize: 16,
    },
  });

  return (
    <Provider store={store}>
      <AuthProvider userManager={userManager} store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <DashboardLayout>
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signout-oidc' component={SignoutOidc} />
                <Route path='/signin-oidc' component={SigninOidc} />
                <PrivateRoute exact path='/' component={Home} />
                <Route path='/todo' component={Todo} />
                <Route path='/about' component={About} />
              </Switch>
            </DashboardLayout>
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
