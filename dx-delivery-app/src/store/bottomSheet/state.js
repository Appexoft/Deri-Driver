import React, {createContext, useReducer} from 'react';
import {SET_BOTTOM_SHEET} from './types';
import BottomSheetReducer from './reducer';

export const BottomSheetContext = createContext();

const BottomSheetState = props => {
  const initialState = {
    bottomSheet: false,
    loading: false,
  };
  const [state, dispatch] = useReducer(BottomSheetReducer, initialState);

  const setOpenBottomSheet = trueOrFalse => {
    dispatch({
      type: SET_BOTTOM_SHEET,
      payload: trueOrFalse,
    });
  };

  return (
    <BottomSheetContext.Provider
      value={{
        loading: state.loading,
        bottomSheet: state.bottomSheet,
        setOpenBottomSheet,
      }}
    >
      {props.children}
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetState;
