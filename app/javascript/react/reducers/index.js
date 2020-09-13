import { combineReducers } from 'redux';

import { authentication } from './authentication';
// import { registration } from './registration.reducer';
// import { users } from './users';
import  accessToken  from './accessToken';
import { alert } from './alert';

const rootReducer = combineReducers({
  authentication,
  // registration,
  // users,
  alert,
  accessToken
});

export default rootReducer;