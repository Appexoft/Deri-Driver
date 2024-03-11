import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {listOfClients} from '@api/clients';
import {UserContext} from '@store/user/state';
import {isAdmin} from '@utils/roles';
import ClientsReducer from './reducer';
import {SET_LOADING, SET_ERROR, GET_CLIENTS} from './types';

export const ClientContext = createContext();

const ClientState = props => {
  const initialState = {
    loading: false,
    listOfClients: [],
    error: false,
  };

  const [state, dispatch] = useReducer(ClientsReducer, initialState);

  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user && isAdmin(user)) {
      getListOfClients();
    }
  }, [getListOfClients, user]);

  const getListOfClients = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const data = await listOfClients();

      dispatch({
        type: GET_CLIENTS,
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

  return (
    <ClientContext.Provider
      value={{
        loading: state.loading,
        listOfClients: state.listOfClients,
        getListOfClients,
      }}>
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
