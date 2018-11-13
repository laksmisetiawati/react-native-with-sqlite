import { combineReducers } from 'redux';

import simulate from './simulateReducers';
// import some from './someReducers';
// import user from './userReducers';
// import auth from './authenticationReducers';
// import redirect from './redirectsReducers';
// import simulation from './simulationReducers';
// import inbox from './inboxReducers';
// import faq from './faqReducers';
// import invest from './investReducers';
import { reducer as form } from 'redux-form';

// import {
//   LOGOUT_SUCCESS
// } from '../actions/actionTypes';


const appReducer = combineReducers({
  simulate,
  // some,
  form,
  // user,
  // auth,
  // redirect,
  // simulation,
  // inbox,
  // faq,
  // invest
  // authentication,
  // user,
  // userPlaylist,
  // nav,
  // onboarding,
  // player,
  // genres,
  // playlist,
  // trendings,
  // banners,
  // search,
  // ordersHistory,
  // order,
  // download,
  // offlineContent,
  // account,
  // news,
  // merchandise,
});

const rootReducer = ( state, action ) => {
  switch (action.type) {
    default:
      return state
  }
  // if ( action.type === LOGOUT_SUCCESS ) {
  //   state = undefined;
  // }
  // return appReducer(state, action)
}

export default rootReducer;