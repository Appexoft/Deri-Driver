import React, {createContext, useReducer, useCallback} from 'react';
import {SET_SCREEN, SET_LOADING, SET_ERROR, SET_COMPANIES} from './types';
import CommonReducer from './reducer';
import {listCompanies} from '@api/companies';

export const CommonContext = createContext();

const CommonState = props => {
  const screenForm = {
    title: '',
    description: '',
    error: false,
    mainAction: () => {},
    secondaryAction: () => {},
  };

  const initialState = {
    loading: false,
    resultScreen: screenForm,
    error: false,
    companies: [],
  };

  const [state, dispatch] = useReducer(CommonReducer, initialState);

  const fetchCompanies = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const companies = await listCompanies();
      dispatch({
        type: SET_COMPANIES,
        payload: companies,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload:
          error?.response?.data ||
          'Occurió un error al obtener los operadores lógisticos',
      });
    } finally {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  }, []);

  const setScreen = useCallback(value => {
    dispatch({
      type: SET_SCREEN,
      payload: value,
    });
  }, []);

  return (
    <CommonContext.Provider
      value={{
        loading: state.loading,
        resultScreen: state.resultScreen,
        companies: state.companies,
        setScreen,
        fetchCompanies,
      }}
    >
      {props.children}
    </CommonContext.Provider>
  );
};

export default CommonState;
