import { UserManager } from 'oidc-client';
import { storeUserError, storeUser } from '../actions/authActions';

const config = {
  authority: process.env.REACT_APP_IdentityServer,
  client_id: 'webapp',
  redirect_uri: process.env.REACT_APP_Webapp + '/signin-oidc',
  response_type: 'id_token token',
  scope: 'openid profile email extra webapi.read webapi.write',
  post_logout_redirect_uri: process.env.REACT_APP_Webapp + '/signout-oidc',
};

const userManager = new UserManager(config);

export async function loadUserFromStorage(store) {
  try {
    let user = await userManager.getUser();
    if (!user) {
      return store.dispatch(storeUserError());
    }
    store.dispatch(storeUser(user));
  } catch (e) {
    console.error(`User not found: ${e}`);
    store.dispatch(storeUserError());
  }
}

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
}

export default userManager;
