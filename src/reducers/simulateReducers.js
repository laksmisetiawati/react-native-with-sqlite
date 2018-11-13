// import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux'

const initialState = {
  data: {},
  isFetching: false,
  error: null,
  current: {
    id: null,
    data: {},
    isFetching: false,
    error: null
  }
}

const simulateReducers = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
  // switch(type) {
  //   case types.INVESTMENT_GET_START:
  //     return {
  //       ...state,
  //       isFetching: true,
  //       error: null,
  //     }
  //   case types.INVESTMENT_GET_SUCCESS:
  //     return {
  //       ...state,
  //       isFetching: false,
  //       data: payload,
  //     }
  //   case types.INVESTMENT_GET_ERROR:
  //     return {
  //       ...state,
  //       isFetching: false,
  //       error: payload,
  //     }

  //   case types.INVESTMENT_FIND_START:
  //     return {
  //       ...state,
  //       current: {
  //         ...state.current,
  //         id: payload,
  //         isFetching: true,
  //         error: null,
  //       }
  //     }
  //   case types.INVESTMENT_FIND_SUCCESS:
  //     return {
  //       ...state,
  //       current: {
  //         ...state.current,
  //         isFetching: false,
  //         data: payload,
  //       }
  //     }
  //   case types.INVESTMENT_FIND_ERROR:
  //     return {
  //       ...state,
  //       current: {
  //         ...state.current,
  //         isFetching: false,
  //         error: payload,
  //       }
  //     }
  //   default:
  //     return state;
  // }
}

export default combineReducers({
  simulate: simulateReducers,
});