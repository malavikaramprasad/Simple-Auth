import { combineReducers } from 'redux';
import authRedcer from './auth';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authRedcer,
    form: formReducer
});