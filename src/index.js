import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './components/auth/signin';
import thunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';
import Signout from './components/signout';
import MainGame from './components/auth/MainGame';
import requireAuth from './components/HOC/auth_hoc';
import SignUp from './components/auth/signup';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const Store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token){
    Store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Switch>
      <Route path='/signup' component={SignUp} />
      <Route path='/MainGame' component={requireAuth(MainGame)} />
      <Route path='/signout' component={Signout} />
      <Route path='/signin' component={Signin} />
      <Route path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
