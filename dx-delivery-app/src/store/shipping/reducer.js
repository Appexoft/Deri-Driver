import {
  GET_SHIPPINGS,
  SET_LOADING,
  SET_ERROR,
  SET_SHIPPING_FILTER,
  SET_LIST_OF_FILTERS,
  SET_ADDRESS_GEOCODE,
  SET_ADDRESS_FLOOR,
  SET_EMPTY_SHIPPING_FORM,
  SET_SHIPPING_DETAIL,
  UPDATE_SHIPPING,
  REFRESH_LIST,
  SET_UNDELIVERED_REASONS,
  SET_SHIPPING_IMAGE,
  CLEAN_SHIPPING_DETAIL_IMAGE,
  SET_ARRAY_OF_SHIPPING_IMAGES,
  SET_ARRAY_OF_NEW_IMAGES,
  DELETE_IMAGE,
  SET_EDIT_ADDRESS_FLOOR,
  SET_EDIT_ADDRESS_GEOCODE,
  SET_CURRENT_ADDRESSES,
  SET_SHIPPING_SELECTED,
  SET_ENABLE_SELECTION,
  MAP_LOADING,
  MAP_ERROR,
  SET_SHIPPING_PURCHASE_DETAILS,
  ADD_VALUE_TO_SHIPPING_FORM,
  SHIPPING_FORM_AVAIBLES_VALUES,
  CREATE_SHIPPING_ERROR,
  SET_PICK_UP_ADDRESSES,
  HANDLE_DELETE_MODAL,
  SET_SUGGESTED_LOCATIONS,
  GET_SHIPPINGS_BY_DATE,
  GET_CLIENTS_BY_DATE,
  SET_OPENED_ZONE,
  GET_CLIENTS_BY_CLIENT_AND_DATE,
  SET_OPENED_CLIENT,
  REFRESH_SHIPPINGS_BY_DATE,
  SET_STATE_FILTER,
  ADD_VALUE_TO_ADDRESS_TYPE_FORM,
  ADD_SHIPPING_BY_ID_CHECKBOX,
  DELETE_SHIPPING_BY_ID_CHECKBOX,
  DELETE_ALLSHIPPING_BY_ID_CHECKBOX,
  SET_ALL_SHIPPING_BY_ID_ARRAY,
} from './types';

export default (state, action) => {
  const {shippingForm, editAddressForm} = state;
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
    case GET_SHIPPINGS:
      return {
        ...state,
        shippingGroups: action.payload.isFirstPage
          ? action.payload.shippingGroups
          : [...state.shippingGroups, ...action.payload.shippingGroups],
        amountOfGroups: action.payload.amountOfGroups,
        error: action.payload.error,
      };
    case SET_SHIPPING_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_LIST_OF_FILTERS:
      return {
        ...state,
        listOfFilters: action.payload,
      };
    case SET_EMPTY_SHIPPING_FORM:
      return {
        ...state,
        shippingForm: action.payload,
      };
    case SET_ADDRESS_GEOCODE:
      return {
        ...state,
        suggestedLocations: [],
        shippingForm: {
          ...shippingForm,
          [action.payload.addressType]: {
            ...shippingForm[action.payload.addressType],
            ...action.payload.data,
          },
        },
      };
    case SET_ADDRESS_FLOOR:
      return {
        ...state,
        shippingForm: {
          ...shippingForm,
          [action.payload.addressType]: {
            ...shippingForm[action.payload.addressType],
            streetFloor: action.payload.data,
          },
        },
      };
    case SET_SUGGESTED_LOCATIONS:
      return {
        ...state,
        suggestedLocations: action.payload,
      };
    case SET_EDIT_ADDRESS_FLOOR:
      return {
        ...state,
        editAddressForm: {
          ...editAddressForm,
          [action.payload.addressType]: {
            ...editAddressForm[action.payload.addressType],
            streetFloor: action.payload.data,
          },
        },
      };
    case SET_EDIT_ADDRESS_GEOCODE:
      return {
        ...state,
        editAddressForm: {
          ...editAddressForm,
          [action.payload.addressType]: {
            ...editAddressForm[action.payload.addressType],
            ...action.payload.data,
          },
        },
      };
    case SET_SHIPPING_DETAIL:
      return {
        ...state,
        shippingDetail: action.payload,
      };
    case UPDATE_SHIPPING:
      return {
        ...state,
        shippingDetail: action.payload,
      };
    case REFRESH_LIST:
      return {
        ...state,
        refreshList: action.payload,
      };
    case SET_UNDELIVERED_REASONS:
      return {
        ...state,
        undeliveredReasons: action.payload,
      };
    case SET_SHIPPING_IMAGE:
      return {
        ...state,
        shippingDetailImages: [...state.shippingDetailImages, action.payload],
        editImages: {
          ...state.editImages,
          newImages: [...state.editImages.newImages, action.payload],
        },
      };
    case DELETE_IMAGE:
      return {
        ...state,
        editImages: {
          ...state.editImages,
          deletedImages: [...state.editImages.deletedImages, action.payload],
        },
      };
    case CLEAN_SHIPPING_DETAIL_IMAGE:
      return {
        ...state,
        shippingDetailImages: [],
        editImages: {
          deletedImages: [],
          newImages: [],
        },
      };
    case SET_ARRAY_OF_SHIPPING_IMAGES:
      return {
        ...state,
        shippingDetailImages: action.payload,
      };
    case SET_ARRAY_OF_NEW_IMAGES:
      return {
        ...state,
        editImages: {
          ...state.editImages,
          newImages: action.payload,
        },
      };
    case SET_CURRENT_ADDRESSES:
      return {
        ...state,
        editAddressForm: action.payload,
      };
    case SET_SHIPPING_SELECTED:
      return {
        ...state,
        shippingSelected: action.payload,
      };
    case SET_ENABLE_SELECTION:
      return {
        ...state,
        enableSelection: action.payload,
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
    case SET_SHIPPING_PURCHASE_DETAILS: {
      return {
        ...state,
        shippingForm: {
          ...shippingForm,
          purchaseDetails: action.payload,
        },
      };
    }
    case ADD_VALUE_TO_SHIPPING_FORM: {
      return {
        ...state,
        shippingForm: {
          ...shippingForm,
          [action.payload.key]: action.payload.value,
        },
      };
    }
    case SHIPPING_FORM_AVAIBLES_VALUES: {
      return {
        ...state,
        avaiblesValues: {
          ...state.avaiblesValues,
          ...action.payload,
        },
      };
    }
    case CREATE_SHIPPING_ERROR: {
      return {
        ...state,
        createShippingError: action.payload,
      };
    }
    case SET_PICK_UP_ADDRESSES: {
      return {
        ...state,
        pickupCenters: action.payload,
      };
    }
    case HANDLE_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: action.payload,
      };
    case GET_SHIPPINGS_BY_DATE:
      const shippingsByDate = action.payload.isFirstPage
        ? action.payload.shippingsByDate
        : [...state.shippingsByDate, ...action.payload.shippingsByDate];
      return {
        ...state,
        shippingsByDate,
        hasMoreDates: !!action.payload.shippingsByDate?.length,
      };
    case REFRESH_SHIPPINGS_BY_DATE:
      return {
        ...state,
        shippingsByDate: [],
        clientsByDate: [],
        openedDate: null,
        openedZone: null,
        shippingsByClientAndDate: [],
        shippingsByClientAndDateAmount: 0,
      };
    case GET_CLIENTS_BY_DATE:
      return {
        ...state,
        clientsByDate: action.payload,
      };
    case SET_OPENED_ZONE:
      return {
        ...state,
        openedDate: action.payload,
      };
    case SET_OPENED_CLIENT:
      return {
        ...state,
        openedZone: action.payload,
      };
    case GET_CLIENTS_BY_CLIENT_AND_DATE:
      const shippingsByClientAndDate = action.payload.isFirstPage
        ? action.payload.shippingGroups
        : [...state.shippingsByClientAndDate, ...action.payload.shippingGroups];
      return {
        ...state,
        shippingsByClientAndDate,
        shippingsByClientAndDateAmount: action.payload.amountOfGroups,
      };
    case SET_STATE_FILTER:
      return {
        ...state,
        stateFilter: action.payload,
      };
    case ADD_VALUE_TO_ADDRESS_TYPE_FORM:
      return {
        ...state,
        shippingForm: {
          ...state.shippingForm,
          [action.payload.addressType]: {
            ...state.shippingForm[action.payload.addressType],
            ...action.payload.value,
          },
        },
      };
    case ADD_SHIPPING_BY_ID_CHECKBOX:
      return {
        ...state,
        shippingSelectedById: [...state.shippingSelectedById, action.payload],
      };
    case DELETE_SHIPPING_BY_ID_CHECKBOX:
      const result = state.shippingSelectedById.filter(
        shipping => shipping !== action.payload,
      );

      return {
        ...state,
        shippingSelectedById: result,
      };
    case DELETE_ALLSHIPPING_BY_ID_CHECKBOX:
      return {
        ...state,
        shippingSelectedById: [],
      };
    case SET_ALL_SHIPPING_BY_ID_ARRAY:
      return {
        ...state,
        shippingSelectedById: action.payload,
      };
    default:
      return state;
  }
};
