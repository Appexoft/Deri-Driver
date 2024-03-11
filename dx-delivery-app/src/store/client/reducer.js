import {SET_LOADING, SET_ERROR, GET_CLIENTS} from './types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_CLIENTS:
      return {
        ...state,
        listOfClients: action.payload,
      };
    default:
      return state;
  }
};
