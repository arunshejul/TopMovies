import reducers from '../reducers/index';
import {
	createStore,
	applyMiddleware,
	combineReducers
} from 'redux';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore);

let store = createStoreWithMiddleware(combineReducers(reducers));

module.exports = store;
