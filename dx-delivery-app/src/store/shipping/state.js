import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {
  listShippings,
  listOfFilters,
  shippingDetail,
  updateShipping,
  deleteShippingById,
  asignShippingRider,
  listUndeliveredReasons,
  addImageToShipping,
  getAddressGeocode,
  createNewShipping,
  asignRiderToShippings,
  getShippingRate,
  getShippingAvaibleValues,
  checkPostalCode,
  shippingHandledByGP,
  deleteShippings,
  getSuggestedLocations,
  updateShippingsState,
  getShippingsGroupApi,
} from '@api/shippings';
import ShippingReducer from './reducer';
import {
  GET_SHIPPINGS,
  SET_ERROR,
  SET_LOADING,
  SET_SHIPPING_FILTER,
  SET_LIST_OF_FILTERS,
  SET_ADDRESS_GEOCODE,
  SET_ADDRESS_FLOOR,
  SET_EMPTY_SHIPPING_FORM,
  SET_SHIPPING_DETAIL,
  REFRESH_LIST,
  SET_UNDELIVERED_REASONS,
  SET_SHIPPING_IMAGE,
  CLEAN_SHIPPING_DETAIL_IMAGE,
  SET_ARRAY_OF_SHIPPING_IMAGES,
  DELETE_IMAGE,
  SET_ARRAY_OF_NEW_IMAGES,
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
  SET_OPENED_CLIENT,
  GET_CLIENTS_BY_CLIENT_AND_DATE,
  REFRESH_SHIPPINGS_BY_DATE,
  SET_GROUP_SHIPPINGS,
  SET_STATE_FILTER,
  ADD_VALUE_TO_ADDRESS_TYPE_FORM,
  ADD_SHIPPING_BY_ID_CHECKBOX,
  DELETE_SHIPPING_BY_ID_CHECKBOX,
  DELETE_ALLSHIPPING_BY_ID_CHECKBOX,
  SET_ALL_SHIPPING_BY_ID_ARRAY,
} from './types';
import {formatShippingData} from '@helpers/shipping';
import {UserContext} from '@store/user/state';
import {shippingStateFilterValues} from '@helpers/constants';

export const ShippingContext = createContext();

const ShippingState = props => {
  const emptyForm = formatShippingData({}, true);

  const initialState = {
    loading: false,
    shippingGroups: [],
    amountOfGroups: 0,
    error: false,
    listOfFilters: [],
    filter: {
      zone: [],
      type: [],
      client: [],
      state: [],
    },
    shippingDetailImages: [],
    shippingForm: emptyForm,
    shippingDetail: {},
    editImages: {
      newImages: [],
      deletedImages: [],
    },
    undeliveredReasons: [],
    refreshList: false,
    editAddressForm: emptyForm,
    shippingSelectedById: [],
    shippingSelected: [],
    enableSelection: false,
    mapIsLoading: false,
    mapError: null,
    avaiblesValues: {},
    createShippingError: false,
    pickupCenters: [],
    showDeleteModal: false,
    suggestedLocations: [],
    shippingsByDate: [],
    openedDate: null,
    clientsByDate: [],
    openedZone: null,
    shippingsByClientAndDate: [],
    shippingsByClientAndDateAmount: 0,
    hasMoreDates: true,
    stateFilter: shippingStateFilterValues.ALL,
    stateShipping: null,
  };

  const [state, dispatch] = useReducer(ShippingReducer, initialState);
  const {isAuthenticating, profileCompleted} = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticating && profileCompleted) {
      getListOfFilters();
      getUndeliveredReasons();
    }
  }, [
    getListOfFilters,
    getUndeliveredReasons,
    isAuthenticating,
    profileCompleted,
  ]);

  const apiUpdateShippingState = useCallback(
    async (newState, shippingId, successCallback, errorCallback) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        const data = await updateShippingsState(
          shippingId,
          newState,
          false,
          new Date(),
        );
        successCallback(data);
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: true,
        });
        errorCallback();
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [],
  );

  const setChangeAllCheckboxInShippingGroup = async trueOrFalse => {
    const shippingIdSelected = [];
    const result = state.shippingGroups.map(shipping => {
      const shippingList = shipping.list.map(list => {
        //if is true, add all idShipping to array else array
        trueOrFalse
          ? shippingIdSelected.push(list.id)
          : shippingIdSelected.push();
        return {
          ...list,
          checkboxPress: trueOrFalse,
        };
      });
      return {
        ...shipping,
        list: shippingList,
      };
    });

    //delete all id in array shippingId selected
    deleteAllShippingSelectById();
    //add new ids
    setShippingSelectByIdArray(shippingIdSelected);

    dispatch({
      type: GET_SHIPPINGS,
      payload: {
        shippingGroups: result,
        isFirstPage: true,
      },
    });
  };

  const setChangeCheckboxInShippingGroupByShippingId = async idShipping => {
    const newShippingGroupWithCheckboxSelected = state.shippingGroups.map(
      shipping => {
        const newShippingResult = shipping.list.map(list => {
          if (list.id === idShipping) {
            return {
              ...list,
              checkboxPress: !list.checkboxPress,
            };
          }
          return {
            ...list,
          };
        });
        return {
          ...shipping,
          list: newShippingResult,
        };
      },
    );

    dispatch({
      type: GET_SHIPPINGS,
      payload: {
        shippingGroups: newShippingGroupWithCheckboxSelected,
        isFirstPage: true,
      },
    });
  };

  const setShippingSelectById = async shippingId => {
    dispatch({
      type: ADD_SHIPPING_BY_ID_CHECKBOX,
      payload: shippingId,
    });
  };

  const deleteShippingSelectById = async shippingId => {
    dispatch({
      type: DELETE_SHIPPING_BY_ID_CHECKBOX,
      payload: shippingId,
    });
  };

  const setShippingSelectByIdArray = async shippingIdArray => {
    dispatch({
      type: SET_ALL_SHIPPING_BY_ID_ARRAY,
      payload: shippingIdArray,
    });
  };

  const deleteAllShippingSelectById = async () => {
    dispatch({type: DELETE_ALLSHIPPING_BY_ID_CHECKBOX});
  };

  const apiDeleteShippingsById = useCallback(
    async (idsArray, successCallback, errorCallback) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        const data = await deleteShippingById(idsArray);
        successCallback(data);
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: true,
        });
        errorCallback();
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [],
  );

  const getDatesWithShippings = useCallback(
    async (page = 1, term = '', date) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });

        const data = await listShippings(page, term, date, state.stateFilter);

        const isFirstPage = page === 1;

        const result = data.map(shipping => {
          const shippingList = shipping.list.map(list => ({
            ...list,
            checkboxPress: false,
          }));
          return {
            ...shipping,
            list: shippingList,
            page,
          };
        });

        dispatch({
          type: GET_SHIPPINGS,
          payload: {
            shippingGroups: result,
            isFirstPage,
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
    },
    [state.stateFilter],
  );

  const getShippingFromGroup = useCallback(
    groupId => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        let selectedGroup = state.shippingGroups.find(({id}) => id === groupId);
        const nextPage = (selectedGroup.page += 1);
        const data = getShippingsGroupApi(groupId, nextPage);

        const updatedShippingsGroups = state.shippingGroups.map(item => {
          if (item.date === groupId) {
            return {
              ...selectedGroup,
              shippings: [selectedGroup.shippings, ...data],
            };
          }
          return item;
        });

        dispatch({
          type: SET_GROUP_SHIPPINGS,
          payload: updatedShippingsGroups,
        });
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: error.response?.data,
        });
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [state.shippingGroups],
  );

  const setFilters = useCallback(({filter = {}}) => {
    dispatch({
      type: SET_SHIPPING_FILTER,
      payload: filter,
    });
  }, []);

  const getListOfFilters = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const data = await listOfFilters();

      dispatch({
        type: SET_LIST_OF_FILTERS,
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

  const addValueToShippingForm = useCallback((key, value) => {
    dispatch({
      type: ADD_VALUE_TO_SHIPPING_FORM,
      payload: {
        key,
        value,
      },
    });
  }, []);

  const clearShippingData = useCallback(() => {
    dispatch({
      type: SET_EMPTY_SHIPPING_FORM,
      payload: formatShippingData({}, true),
    });
  }, []);

  const setAddressGeocode = useCallback(
    async (addressType, place_id, suggestedText, edit) => {
      try {
        dispatch({
          type: MAP_LOADING,
          payload: true,
        });
        dispatch({
          type: MAP_ERROR,
          payload: null,
        });

        const data = await getAddressGeocode(place_id);

        if (!data.postalCode) {
          return dispatch({
            type: MAP_ERROR,
            payload: 'Dirección incorrecta',
          });
        }

        data.place_id = place_id;

        if (!data.streetName) {
          data.streetName = suggestedText;
        }

        if (edit) {
          dispatch({
            type: SET_EDIT_ADDRESS_GEOCODE,
            payload: {
              addressType,
              data,
            },
          });
        }

        dispatch({
          type: SET_ADDRESS_GEOCODE,
          payload: {
            addressType,
            data,
          },
        });
      } catch (error) {
        return dispatch({
          type: MAP_ERROR,
          payload:
            typeof error?.response?.data === 'string'
              ? error?.response?.data
              : 'Ocurrió un error',
        });
      } finally {
        dispatch({
          type: MAP_LOADING,
          payload: false,
        });
      }
    },
    [],
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
        type: SET_ERROR,
        payload: true,
      });
      return [];
    }
  }, []);

  const setDestination = useCallback(data => {
    return dispatch({
      type: SET_ADDRESS_GEOCODE,
      payload: {
        addressType: 'destination',
        data,
      },
    });
  }, []);

  const setDefaultOrigin = useCallback(origin => {
    dispatch({
      type: SET_ADDRESS_GEOCODE,
      payload: {
        addressType: 'origin',
        data: origin,
      },
    });
  }, []);

  const setStreetFloor = useCallback(async (addressType, data, edit) => {
    try {
      if (edit) {
        return dispatch({
          type: SET_EDIT_ADDRESS_FLOOR,
          payload: {
            addressType,
            data,
          },
        });
      }
      dispatch({
        type: SET_ADDRESS_FLOOR,
        payload: {
          addressType,
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
  }, []);

  const getShippingDetail = useCallback(async (shippingId, isFromQR) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const {shipping} = await shippingDetail(shippingId, isFromQR);

      dispatch({
        type: SET_SHIPPING_DETAIL,
        payload: shipping,
      });
      dispatch({
        type: SET_ERROR,
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response?.data || true,
      });
    } finally {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  }, []);

  const setShippingDetail = async shipping => {
    dispatch({
      type: SET_SHIPPING_DETAIL,
      payload: shipping,
    });
  };

  const asignRider = useCallback(async (shippingId, riderId) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const {shipping} = await asignShippingRider(shippingId, riderId);

      dispatch({
        type: SET_SHIPPING_DETAIL,
        payload: shipping,
      });

      dispatch({
        type: REFRESH_LIST,
        payload: true,
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
      dispatch({
        type: REFRESH_LIST,
        payload: false,
      });
    }
  }, []);

  const hasFilter = useCallback(() => {
    return (
      state.filter.zone.length > 0 ||
      state.filter.client.length > 0 ||
      state.filter.type.length > 0 ||
      state.filter.state.length > 0
    );
  }, [state.filter]);
  const shippingUpdate = useCallback(
    async newShipping => {
      const {editImages} = state;
      let hasError = true;
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });

        const {shipping} = await updateShipping(newShipping);

        if (!shipping) {
          return dispatch({
            type: SET_ERROR,
            payload: true,
          });
        }
        dispatch({
          type: SET_ERROR,
          payload: false,
        });

        if (
          editImages &&
          (editImages.newImages?.length || editImages.deletedImages?.length)
        ) {
          await addImageToShipping(
            newShipping.id,
            editImages.newImages,
            editImages.deletedImages,
          );

          dispatch({
            type: CLEAN_SHIPPING_DETAIL_IMAGE,
          });
        }

        await getShippingDetail(newShipping.id);

        dispatch({
          type: REFRESH_LIST,
          payload: true,
        });
        hasError = false;
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
        dispatch({
          type: REFRESH_LIST,
          payload: false,
        });
      }
      return hasError;
    },
    [getShippingDetail, state],
  );

  const getUndeliveredReasons = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const {undeliveredReasons} = await listUndeliveredReasons();

      if (!undeliveredReasons) {
        return dispatch({
          type: SET_ERROR,
          payload: true,
        });
      }
      dispatch({
        type: SET_UNDELIVERED_REASONS,
        payload: undeliveredReasons,
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

  const asignImageToShipping = useCallback(async image => {
    dispatch({
      type: SET_SHIPPING_IMAGE,
      payload: image,
    });
  }, []);

  const setArrayOfImages = useCallback(async images => {
    dispatch({
      type: SET_ARRAY_OF_SHIPPING_IMAGES,
      payload: images,
    });
  }, []);

  const removeImageToShipping = useCallback(
    uri => {
      const filteredShippingImages = state.shippingDetailImages.filter(
        shippingImage => {
          if (shippingImage.uri === uri && shippingImage.id) {
            dispatch({
              type: DELETE_IMAGE,
              payload: shippingImage,
            });
          } else {
            const arrayOfNewImages = state.editImages.newImages.filter(
              image => image.uri !== uri,
            );
            dispatch({
              type: SET_ARRAY_OF_NEW_IMAGES,
              payload: arrayOfNewImages,
            });
          }

          return shippingImage.uri !== uri;
        },
      );
      dispatch({
        type: SET_ARRAY_OF_SHIPPING_IMAGES,
        payload: filteredShippingImages,
      });
    },
    [state.editImages.newImages, state.shippingDetailImages],
  );

  const cleanDetailProgress = useCallback(() => {
    dispatch({
      type: CLEAN_SHIPPING_DETAIL_IMAGE,
    });
  }, []);

  const createShipping = useCallback(
    async (purchaseDetails, successCallback, errorCallback) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });

        const formData = state.shippingForm;

        const createdShipping = await createNewShipping({
          ...formData,
          UserId: formData.client?.id,
          price: purchaseDetails.totalAmount,
          dateOfDelivery: purchaseDetails?.date,
          client: formData.receiverName,
          agency:
            formData.destinationType === 'AGENCY' ? formData.agency?.id : null,
          neighborhood: formData?.neighborhood?.id || null,
          rateId: purchaseDetails?.rate?.id,
          name: formData?.receiverDetails?.name,
          phone: formData?.receiverDetails?.phone,
          details: formData?.receiverDetails?.details,
          packages: formData.packages?.packages,
          type: 1,
        });
        successCallback(createdShipping.number);

        await getDatesWithShippings(1, '');
      } catch (error) {
        if (typeof errorCallback === 'function') {
          errorCallback();
        }

        let errMsg = error.response?.data?.errors
          ? error.response?.data?.errors?.reduce(
              (acc, next, i) => acc.concat(`${i + 1}. ${next.msg} `),
              '',
            )
          : error.response?.data;
        dispatch({
          type: CREATE_SHIPPING_ERROR,
          payload: errMsg,
        });
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [getDatesWithShippings, state.shippingForm],
  );

  const dismissCreateShippingError = useCallback(async form => {
    dispatch({
      type: CREATE_SHIPPING_ERROR,
      payload: false,
    });
  }, []);

  const dismissError = useCallback(async form => {
    dispatch({
      type: SET_ERROR,
      payload: false,
    });
  }, []);

  const setCurrentAddresses = useCallback(async form => {
    dispatch({
      type: SET_CURRENT_ADDRESSES,
      payload: form,
    });
  }, []);

  const setSelectedShipping = useCallback(
    (value, item, isHandledByGP) => {
      let currentSelection = [];

      if (isHandledByGP) {
        currentSelection = state.shippingSelected.filter(
          _item => _item.id !== item.id,
        );
        currentSelection = [
          ...currentSelection,
          {
            id: item.id,
            isHandledByGP: value,
          },
        ];
      } else {
        if (value) {
          currentSelection = [...state.shippingSelected, item.id];
        } else {
          currentSelection = state.shippingSelected.filter(
            _item => _item !== item.id,
          );
        }
      }

      return dispatch({
        type: SET_SHIPPING_SELECTED,
        payload: currentSelection,
      });
    },

    [state.shippingSelected],
  );

  const _asignRiderToShippings = useCallback(
    async riderId => {
      try {
        const data = await asignRiderToShippings(
          state.shippingSelected,
          riderId,
        );

        if (data) {
          dispatch({
            type: SET_SHIPPING_SELECTED,
            payload: [],
          });

          dispatch({
            type: SET_ENABLE_SELECTION,
            payload: false,
          });
          dispatch({
            type: REFRESH_LIST,
            payload: true,
          });
        }
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
        dispatch({
          type: REFRESH_LIST,
          payload: false,
        });
      }
    },
    [state.shippingSelected],
  );

  const shippingRate = useCallback(
    async (
      originPostalCode,
      destinyPostalCode,
      packages,
      typeOfShipping,
      shippingMethod,
      successCallback,
    ) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        const purchaseDatails = await getShippingRate(
          originPostalCode,
          destinyPostalCode,
          packages,
          typeOfShipping,
          shippingMethod,
        );
        return purchaseDatails;
      } catch (error) {
        dispatch({
          type: CREATE_SHIPPING_ERROR,
          payload: error.response?.data,
        });
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [],
  );

  const getShippingFormAvaibleValues = useCallback(
    async (
      field,
      originPostalCode,
      destinyPostalCode,
      shippingMethod,
      isAgency,
      isPickup,
      successCallback,
    ) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });

        const {
          typesOfShipping,
          shippingMethods,
          agencies,
          neighborhoods = [],
        } = await getShippingAvaibleValues(
          originPostalCode,
          destinyPostalCode,
          shippingMethod,
          isAgency,
          isPickup,
        );

        let payload = {};

        if (!field) {
          payload = {shippingMethods, typesOfShipping};
        }

        if (field === 'methods') {
          payload = {shippingMethods};
        }

        if (field === 'type') {
          payload = {typesOfShipping};
        }

        payload = {...payload, agencies, neighborhoods};

        dispatch({
          type: SHIPPING_FORM_AVAIBLES_VALUES,
          payload,
        });

        if (successCallback) {
          return successCallback();
        }
      } catch (error) {
        dispatch({
          type: CREATE_SHIPPING_ERROR,
          payload: error.response?.data,
        });
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [],
  );

  const _checkPostalCode = useCallback(async (postalCode, successCallback) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const {pickup} = await checkPostalCode(postalCode);

      if (pickup) {
        dispatch({
          type: SET_PICK_UP_ADDRESSES,
          payload: pickup,
        });
      }
      successCallback();
    } catch (error) {
      dispatch({
        type: CREATE_SHIPPING_ERROR,
        payload: error.response?.data,
      });
    } finally {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  }, []);

  const _shippingHandledByGP = useCallback(async () => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const {shippings} = await shippingHandledByGP(state.shippingSelected);

      if (shippings) {
        await getDatesWithShippings(1, '');
        dispatch({
          type: SET_SHIPPING_SELECTED,
          payload: [],
        });
        dispatch({
          type: SET_ENABLE_SELECTION,
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error,
      });
    } finally {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  }, [getDatesWithShippings, state.shippingSelected]);

  const handleDeleteModal = useCallback(() => {
    dispatch({
      type: HANDLE_DELETE_MODAL,
      payload: !state.showDeleteModal,
    });
  }, [state.showDeleteModal]);

  const deleteShipping = useCallback(
    async callback => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        handleDeleteModal();

        await deleteShippings([state.shippingDetail]);

        await getDatesWithShippings(1, '');
        callback(true);
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: true,
        });
        callback(false);
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [getDatesWithShippings, handleDeleteModal, state.shippingDetail],
  );

  const getShippingsByClientAndDate = useCallback(
    async (zone, term, page = 1) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_OPENED_CLIENT,
          payload: zone,
        });

        if (!zone) {
          return dispatch({
            type: GET_CLIENTS_BY_CLIENT_AND_DATE,
            payload: {
              isFirstPage: true,
              shippingGroups: [],
            },
          });
        }

        const isFirstPage = page === 1;

        const {shippingGroups, amountOfGroups} = await listShippings(
          page,
          term,
          state.openedDate,
          state.stateFilter,
        );

        dispatch({
          type: GET_CLIENTS_BY_CLIENT_AND_DATE,
          payload: {
            isFirstPage,
            shippingGroups,
            amountOfGroups,
          },
        });
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: error,
        });
      } finally {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }
    },
    [state.openedDate, state.stateFilter],
  );

  const refreshShippingsByDate = useCallback(() => {
    dispatch({
      type: REFRESH_SHIPPINGS_BY_DATE,
    });
  }, []);

  const setStateFilter = useCallback(
    (filterValue = shippingStateFilterValues.ALL) => {
      dispatch({
        type: SET_STATE_FILTER,
        payload: filterValue,
      });
    },
    [],
  );

  const setValueToAddressTypeForm = useCallback((addressType, value) => {
    dispatch({
      type: ADD_VALUE_TO_ADDRESS_TYPE_FORM,
      payload: {
        addressType,
        value,
      },
    });
  }, []);

  return (
    <ShippingContext.Provider
      value={{
        loading: state.loading,
        shippingGroups: state.shippingGroups,
        amountOfGroups: state.amountOfGroups,
        filter: state.filter,
        listOfFilters: state.listOfFilters,
        shippingDetail: state.shippingDetail,
        refreshList: state.refreshList,
        undeliveredReasons: state.undeliveredReasons,
        shippingDetailImages: state.shippingDetailImages,
        errorRequest: state.error,
        shippingForm: state.shippingForm,
        editAddressForm: state.editAddressForm,
        enableSelection: state.enableSelection,
        shippingSelected: state.shippingSelected,
        mapIsLoading: state.mapIsLoading,
        mapError: state.mapError,
        avaiblesValues: state.avaiblesValues,
        createShippingError: state.createShippingError,
        pickupCenters: state.pickupCenters,
        showDeleteModal: state.showDeleteModal,
        suggestedLocations: state.suggestedLocations,
        shippingsByDate: state.shippingsByDate,
        openedDate: state.openedDate,
        clientsByDate: state.clientsByDate,
        openedZone: state.openedZone,
        shippingsByClientAndDate: state.shippingsByClientAndDate,
        shippingsByClientAndDateAmount: state.shippingsByClientAndDateAmount,
        hasMoreDates: state.hasMoreDates,
        stateFilter: state.stateFilter,
        shippingSelectedById: state.shippingSelectedById,
        getDatesWithShippings,
        setFilters,
        getListOfFilters,
        setAddressGeocode,
        setStreetFloor,
        clearShippingData,
        createShipping,
        getShippingDetail,
        setShippingDetail,
        asignRider,
        shippingUpdate,
        getUndeliveredReasons,
        asignImageToShipping,
        removeImageToShipping,
        setArrayOfImages,
        cleanDetailProgress,
        setCurrentAddresses,
        setSelectedShipping,
        _asignRiderToShippings,
        dismissError,
        hasFilter,
        shippingRate,
        setDefaultOrigin,
        addValueToShippingForm,
        getShippingFormAvaibleValues,
        dismissCreateShippingError,
        _checkPostalCode,
        _shippingHandledByGP,
        setDestination,
        handleDeleteModal,
        deleteShipping,
        getSuggestedAddresses,
        getShippingsByClientAndDate,
        refreshShippingsByDate,
        getShippingFromGroup,
        setStateFilter,
        setValueToAddressTypeForm,
        setShippingSelectById,
        deleteShippingSelectById,
        deleteAllShippingSelectById,
        setChangeCheckboxInShippingGroupByShippingId,
        setChangeAllCheckboxInShippingGroup,
        setShippingSelectByIdArray,
        apiDeleteShippingsById,
        apiUpdateShippingState,
      }}
    >
      {props.children}
    </ShippingContext.Provider>
  );
};

export default ShippingState;
