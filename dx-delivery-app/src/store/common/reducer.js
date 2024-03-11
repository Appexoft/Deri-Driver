import {SET_LOADING, SET_ERROR, SET_SCREEN, SET_COMPANIES} from './types';

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
    case SET_SCREEN:
      return {
        ...state,
        resultScreen: action.payload,
      };
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    default:
      return state;
  }
};
