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

export default (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticating: action.payload.isAuthenticating,
        user: action.payload.user,
        isLoading: false,
        profileCompleted: true,
      };
    case ERROR:
      return {
        ...state,
        authError: action.payload.authError,
        isLoading: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        permissions: [],
        isAuthenticating: false,
        authError: null,
        isLoading: false,
      };
    case SET_MELI_AUTH_URL:
      return {
        ...state,
        meliAuthUrl: action.payload.meliAuthUrl,
      };
    case START_SIGN_UP:
      return {
        ...state,
        profileCompleted: false,
        user: action.payload,
        isAuthenticating: true,
      };
    case SIGNUP_ERROR_MESSAGE:
      return {
        ...state,
        signupErrorMessage: action.payload,
      };
    case SET_ADDRESS_GEOCODE:
      return {
        ...state,
        suggestedLocations: [],
        addressForm: action.payload.data,
      };
    case SET_ADDRESS_FLOOR:
      return {
        ...state,
        addressForm: {
          ...state.addressForm,
          streetFloor: action.payload.data,
        },
      };
    case SET_SUGGESTED_LOCATIONS:
      return {
        ...state,
        suggestedLocations: action.payload,
      };
    case MAP_LOADING:
      return {
        ...state,
        mapIsLoading: action.payload,
      };
    case MAP_ERROR:
      return {
        ...state,
        mapError: action.payload,
      };
    case UPDATE_BUSINESS_ERROR:
      return {
        ...state,
        updateBusinessError: action.payload,
      };
    default:
      return state;
  }
};
