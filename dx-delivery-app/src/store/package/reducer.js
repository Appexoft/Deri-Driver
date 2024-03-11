import {GET_PACKAGE_TYPE, SET_LOADING, SET_ERROR} from './types';

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
    case GET_PACKAGE_TYPE:
      return {
        ...state,
        packageTypes: action.payload,
      };
    default:
      return state;
  }
};
