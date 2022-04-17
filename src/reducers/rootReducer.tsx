import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    loginReducer,
    cartReducer
});

export default rootReducer;