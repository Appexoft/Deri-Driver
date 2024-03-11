import React, {createContext, useReducer, useCallback} from 'react';

import {listPackageTypes} from '@api/packageType';

import PackageTypeReducer from './reducer';

import {GET_PACKAGE_TYPE, SET_LOADING, SET_ERROR} from './types';

export const PackageTypeContext = createContext();

const PackageTypeState = props => {
  const initialState = {
    loading: false,
    error: false,
    packageTypes: null,
  };
  const [state, dispatch] = useReducer(PackageTypeReducer, initialState);

  const getListPackageTypes = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const data = await listPackageTypes();

      const result = data.map(resultData => {
        return {
          id: resultData.id,
          value: resultData.name,
          description: resultData.description,
          activate: false,
        };
      });

      dispatch({
        type: GET_PACKAGE_TYPE,
        payload: {
          packageTypes: result,
        },
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
    <PackageTypeContext.Provider
      value={{
        loading: state.loading,
        errorRequest: state.error,
        packageTypes: state.packageTypes,
        getListPackageTypes,
      }}
    >
      {props.children}
    </PackageTypeContext.Provider>
  );
};

export default PackageTypeState;
