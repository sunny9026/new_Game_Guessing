import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authenticated from './reducer_auth';

const rootReducer = combineReducers({
  form,
  authenticated
});

export default rootReducer;
