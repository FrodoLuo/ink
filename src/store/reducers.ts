import { combineReducers } from 'redux';
import article from './modules/articles';
const reducers = combineReducers({ article });

export default reducers;