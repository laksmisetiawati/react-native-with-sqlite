// import {
// 	createStore,
// 	applyMiddleware
// } from 'redux';
// import thunk from 'redux-thunk';
// import {createLogger} from 'redux-logger';
// import rootReducers from './reducers';
// import {
// 	reduxifyNavigator,
// 	createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';


// let middleware = [thunk];

// if (__DEV__) {
// 	const logger = createLogger();
// 	const middlewareNavigation = createReactNavigationReduxMiddleware(
// 	"root",
// 	state => state.nav,
// 	);
// 	middleware = [...middleware, logger, middlewareNavigation];
// } else {
// 	middleware = [...middleware];
// }

// export default function configureStore(){
// 	return createStore(
// 		rootReducers,
// 		applyMiddleware(...middleware)
// 	);
// }

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

export default function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(thunk))
  return store
}