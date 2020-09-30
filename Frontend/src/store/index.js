import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { messageReducer } from './reducers/messageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
});

export default createStore(rootReducer);
