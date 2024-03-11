import React, {createContext, useReducer, useCallback} from 'react';
import RiderReducer from './reducer';
import {SET_LOADING, SET_ERROR, GET_RIDERS, SET_QUERY} from './types';
import {listRiders} from '@api/riders';

export const RiderContext = createContext();

const RiderState = props => {
  const initialState = {
    loading: false,
    listOfRiders: [],
    error: false,
    query: '',
  };

  const [state, dispatch] = useReducer(RiderReducer, initialState);

  const getListOfRiders = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const data = await listRiders();

      dispatch({
        type: GET_RIDERS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: true,
      });
    } finally {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  }, []);

  const setQuery = useCallback(async query => {
    dispatch({
      type: SET_QUERY,
      payload: query,
    });
  }, []);

  return (
    <RiderContext.Provider
      value={{
        loading: state.loading,
        listOfRiders: state.listOfRiders,
        query: state.query,
        getListOfRiders,
        setQuery,
      }}>
      {props.children}
    </RiderContext.Provider>
  );
};

export default RiderState;
