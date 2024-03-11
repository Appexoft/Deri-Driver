import {SET_BOTTOM_SHEET} from './types';

export default (state, action) => {
  switch (action.type) {
    case SET_BOTTOM_SHEET:
      return {
        ...state,
        bottomSheet: action.payload,
      };
    default:
      return state;
  }
};
