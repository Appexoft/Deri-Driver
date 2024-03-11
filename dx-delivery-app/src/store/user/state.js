import React, {createContext, useReducer, useCallback, useEffect} from 'react';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth0 from 'react-native-auth0';
import UserReducer from './reducer';
import {
  LOGIN,
  LOGOUT,
  ERROR,
  LOADING,
  START_SIGN_UP,
  SIGNUP_ERROR_MESSAGE,
  SET_ADDRESS_GEOCODE,
  SET_ADDRESS_FLOOR,
  MAP_LOADING,
  MAP_ERROR,
  SET_MELI_AUTH_URL,
  UPDATE_BUSINESS_ERROR,
  SET_SUGGESTED_LOCATIONS,
} from './types';
import {setAuthorization, unsetAuthorization} from '@api';
import {getAddressGeocode, getSuggestedLocations} from '@api/shippings';
import {Persistor} from '@utils';
import {getUser, signup, getMeliAuthUrl, updateBusiness} from '@api/user';

export const UserContext = createContext();

export let globalSilentLogout = null;

const emptyAddressForm = {
  streetName: '',
  streetNumber: '',
  streetFloor: '',
  postalCode: '',
  address: '',
  place_id: '',
  location: {
    lat: -34.8824311,
    long: -56.1758958,
  },
};

const UserState = props => {
  const initialState = {
    user: null,
    permissions: [],
    isAuthenticating: false,
    authError: null,
    isLoading: true,
    meliAuthUrl: null,
    profileCompleted: false,
    mapIsLoading: false,
    mapError: null,
    updateBusinessError: false,
    signupErrorMessage: {},
    addressForm: emptyAddressForm,
    suggestedLocations: [],
  };

  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID,
  });

  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const login = useCallback(async () => {
    try {
      dispatch({
        type: LOADING,
        payload: {
          isLoading: true,
        },
      });
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile offline_access',
      });

      if (credentials) {
        await Persistor.persistUserInfo(credentials);
        getUserInfo();
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: {
          authError: error,
        },
      });
    } finally {
      dispatch({
        type: LOADING,
        payload: {
          isLoading: false,
        },
      });
    }
  }, [auth0.webAuth, getUserInfo]);

  const logout = useCallback(() => {
    dispatch({
      type: LOADING,
      payload: {
        isLoading: true,
      },
    });
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Persistor.persistUserInfo('');
        unsetAuthorization();
        dispatch({
          type: LOGOUT,
        });
      })
      .catch(error => {
        dispatch({
          type: ERROR,
          payload: {
            authError: error,
          },
        });
      });
  }, [auth0.webAuth]);

  useEffect(() => {
    if (logout) {
      globalSilentLogout = logout;
    }
  }, [logout]);

  const getUserInfo = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem('user_token');
      if (json && JSON.parse(json)) {
        let credentials = JSON.parse(json);
        const refreshToken = credentials.refreshToken;
        const refreshTokenResponse = await auth0.auth.refreshToken({
          refreshToken,
        });
        if (refreshTokenResponse) {
          credentials = refreshTokenResponse;
          credentials.refreshToken = refreshToken;
          await Persistor.persistUserInfo(credentials);
        }
        const user = await auth0.auth.userInfo({
          token: credentials.accessToken,
        });

        if (user) {
          await setAuthorization(`Bearer ${credentials.idToken}`);

          const {user: currentUser} = await getUser();

          if (user && currentUser) {
            return dispatch({
              type: LOGIN,
              payload: {
                isAuthenticating: true,
                user: {...user, ...currentUser, token: credentials.idToken},
              },
            });
          }
          return dispatch({
            type: START_SIGN_UP,
            payload: user,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: {
          authError: error,
        },
      });
    } finally {
      dispatch({
        type: LOADING,
        payload: {
          isLoading: false,
        },
      });
    }
  }, [auth0.auth]);

  const getMeliAuthWebUrl = useCallback(async () => {
    try {
      dispatch({
        type: LOADING,
        payload: {
          isLoading: true,
        },
      });

      const {url} = await getMeliAuthUrl();

      dispatch({
        type: SET_MELI_AUTH_URL,
        payload: {
          meliAuthUrl: url,
        },
      });
      return url;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: {
          authError: error,
        },
      });
    } finally {
      dispatch({
        type: LOADING,
        payload: {
          isLoading: false,
        },
      });
    }
  }, []);

  const _signup = useCallback(
    async form => {
      try {
        dispatch({
          type: LOADING,
          payload: {
            isLoading: true,
          },
        });

        dispatch({
          type: SIGNUP_ERROR_MESSAGE,
          payload: {},
        });

        const {user} = await signup(form);

        if (user) {
          await getUserInfo();
          dispatch({
            type: SET_ADDRESS_GEOCODE,
            payload: {
              data: emptyAddressForm,
            },
          });
        }
      } catch (error) {
        if (error?.response?.data) {
          return dispatch({
            type: SIGNUP_ERROR_MESSAGE,
            payload: {
              message: error.response.data?.message ?? error.response.data,
              field: error.response.data?.field ?? 'global',
            },
          });
        }
        dispatch({
          type: SIGNUP_ERROR_MESSAGE,
          payload: {
            message: 'Ocurrió un error al crear perfil',
            field: 'global',
          },
        });
      } finally {
        dispatch({
          type: LOADING,
          payload: {
            isLoading: false,
          },
        });
      }
    },
    [getUserInfo],
  );

  const setAddressGeocode = useCallback(
    async (
      place_id,
      persist = false,
      addressFloor,
      onlyDirection = false,
      suggestedText,
    ) => {
      let hasData = false;
      try {
        dispatch({
          type: MAP_LOADING,
          payload: true,
        });
        dispatch({
          type: MAP_ERROR,
          payload: null,
        });

        const data = await getAddressGeocode(place_id, onlyDirection);

        if (!data.postalCode) {
          return dispatch({
            type: MAP_ERROR,
            payload: 'Dirección incorrecta',
          });
        }
        if (persist) {
          if (!data.streetName) {
            data.streetName = suggestedText;
          }

          data.address = `${data.streetName} ${data.streetNumber} ${addressFloor}`;

          data.place_id = place_id;

          dispatch({
            type: SET_ADDRESS_GEOCODE,
            payload: {
              data,
            },
          });

          dispatch({
            type: SET_ADDRESS_FLOOR,
            payload: {
              data: addressFloor,
            },
          });
        } else {
          let newLocation = state.addressForm;
          newLocation.location = data.location;
          dispatch({
            type: SET_ADDRESS_GEOCODE,
            payload: {
              data: newLocation,
            },
          });
        }
        hasData = true;
      } catch (error) {
        return dispatch({
          type: MAP_ERROR,
          payload: error?.response?.data,
        });
      } finally {
        dispatch({
          type: MAP_LOADING,
          payload: false,
        });
      }
      return hasData;
    },
    [state.addressForm],
  );

  const getSuggestedAddresses = useCallback(async address => {
    try {
      let suggestedLocations = await getSuggestedLocations(address);
      if (suggestedLocations.error) {
        throw suggestedLocations.error;
      }
      let results;
      if (suggestedLocations && suggestedLocations.length > 0) {
        // used for autocomplete component
        results = suggestedLocations.map(e => {
          return {...e, id: e.place_id, title: e.main_text};
        });
      }

      dispatch({
        type: SET_SUGGESTED_LOCATIONS,
        payload: results,
      });
      return results;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: true,
      });
      return [];
    }
  }, []);

  const setStreetFloor = useCallback(async data => {
    try {
      dispatch({
        type: SET_ADDRESS_FLOOR,
        payload: {
          data,
        },
      });
    } catch (error) {
      if (error.response?.data?.field) {
        return dispatch({
          type: SIGNUP_ERROR_MESSAGE,
          payload: {
            message: error.response.data.message,
            field: error.response.data.field,
          },
        });
      }
      dispatch({
        type: ERROR,
        payload: {
          signupError: error?.response.data,
        },
      });
    }
  }, []);

  const updateUserBusiness = useCallback(
    async form => {
      try {
        dispatch({
          type: LOADING,
          payload: {
            isLoading: true,
          },
        });

        const {business} = await updateBusiness(form);

        if (business) {
          await getUserInfo();
        }
      } catch (error) {
        dispatch({
          type: UPDATE_BUSINESS_ERROR,
          payload: error?.response?.data?.message,
        });
      } finally {
        dispatch({
          type: LOADING,
          payload: {
            isLoading: false,
          },
        });
      }
    },
    [getUserInfo],
  );

  return (
    <UserContext.Provider
      value={{
        isAuthenticating: state.isAuthenticating,
        user: state.user,
        permissions: state.permissions,
        meliAuthUrl: state.meliAuthUrl,
        getMeliAuthWebUrl: getMeliAuthWebUrl,
        filter: state.filter,
        authError: state.authError,
        isLoading: state.isLoading,
        profileCompleted: state.profileCompleted,
        signupErrorMessage: state.signupErrorMessage,
        addressForm: state.addressForm,
        mapIsLoading: state.mapIsLoading,
        mapError: state.mapError,
        suggestedLocations: state.suggestedLocations,
        login,
        logout,
        _signup,
        setAddressGeocode,
        setStreetFloor,
        updateUserBusiness,
        getSuggestedAddresses,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
