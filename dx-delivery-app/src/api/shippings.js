import axios from '@api';

export const listShippings = async (
  page = 1,
  term = '',
  date = null,
  stateFilter,
) => {
  const {data} = await axios.get(
    `/shipping/list?page=${page}&term=${term}&date=${date}&stateFilter=${stateFilter}`,
  );
  return data;
};

export const listOfFilters = async () => {
  const {data} = await axios.get('/shipping/list-filters');
  return data;
};

export const shippingTypes = async (originPostalCode, destinyPostalCode) => {
  const {data} = await axios.get(
    `/shipping/types?originPostalCode=${originPostalCode}&destinyPostalCode=${destinyPostalCode}`,
  );
  return data;
};

let cancelToken;

export const getAddressGeocode = async (place_id, onlyDirection = false) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Operation canceled due to new request.');
  }
  cancelToken = axios.CancelToken.source();
  const {data} = await axios.get(
    `/shipping/geocode?place_id=${place_id}&onlyDirection=${onlyDirection}`,
    {
      cancelToken: cancelToken.token,
    },
  );
  return data;
};

export const getSuggestedLocations = async address => {
  try {
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }
    cancelToken = axios.CancelToken.source();
    const {data} = await axios.get(
      `/shipping/suggested-locations?address=${address}`,
      {
        cancelToken: cancelToken.token,
      },
    );
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      return [];
    }
    return {error};
  }
};

export const createNewShipping = async formData => {
  const {data} = await axios.post('/shipping/new', formData);
  return data;
};
export const shippingDetail = async (shippingId, isFromQR) => {
  const {data} = await axios.get(
    `/shipping/${shippingId}?isFromQR=${isFromQR}`,
  );
  return data;
};

export const asignShippingRider = async (shippingId, riderId) => {
  const {data} = await axios.put(`/shipping/${shippingId}/${riderId}`);
  return data;
};

export const updateShipping = async shipping => {
  const {data} = await axios.put(`/shipping/${shipping.id}`, {
    shipping,
  });
  return data;
};

export const deleteShippings = async shippings => {
  const {data} = await axios.delete('/shipping/delete', {
    data: {
      shippings,
    },
  });
  return data;
};

export const listUndeliveredReasons = async () => {
  const {data} = await axios.get('/shipping/undelivered');
  return data;
};

export const asignRiderToShippings = async (shippings, riderId) => {
  const {data} = await axios.put(`/shipping/riders/${riderId}`, {
    shippings,
  });
  return data;
};

export const checkPostalCode = async postalCode => {
  const {data} = await axios.get(
    `/shipping/checkPostalCode?postalCode=${postalCode}`,
  );
  return data;
};

export const getShippingRate = async (
  originPostalCode,
  destinyPostalCode,
  packages,
  typeOfShipping,
  shippingMethod,
) => {
  const {data} = await axios.get(
    `/shipping/rate?originPostalCode=${originPostalCode}&destinyPostalCode=${destinyPostalCode}&packages=${packages}&typeOfShipping=${typeOfShipping}&shippingMethod=${shippingMethod}`,
  );
  return data;
};

export const getShippingAvaibleValues = async (
  originPostalCode,
  destinyPostalCode,
  shippingMethod,
  isAgency = false,
  isPickup = false,
) => {
  const {data} = await axios.get(
    `/shipping/deliveryPossibilities?originPostalCode=${originPostalCode}&destinyPostalCode=${destinyPostalCode}&isAgency=${isAgency}&isPickup=${isPickup}${
      shippingMethod ? `&shippingMethod=${shippingMethod}` : ''
    }`,
  );
  return data;
};

export const addImageToShipping = async (
  shippingId,
  newShippingPhoto,
  deletedShippingPhoto,
) => {
  const formData = new FormData();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  for (const key in newShippingPhoto) {
    const value = newShippingPhoto[key];
    if (Array.isArray(value)) {
      value.forEach(_value => formData.append('shippingPhotos', _value));
    } else {
      formData.append('shippingPhotos', value);
    }
  }

  formData.append('deletedFiles', JSON.stringify(deletedShippingPhoto));

  const {data} = await axios.post(
    `/shipping/${shippingId}/upload-image`,
    formData,
    {
      headers,
    },
  );
  return data;
};

export const shippingHandledByGP = async shippings => {
  const {data} = await axios.post('/shipping/shippingHandledByGP', {
    shippings,
  });
  return data;
};

export const updateShippingsState = async (shippings, state, all, date) => {
  const {data} = await axios.put('/shipping/shippings/state', {
    shippings,
    state,
    all,
    date,
  });
  return data;
};

export const deleteShippingById = async shippingSelectedById => {
  const {data} = await axios.delete('/shipping/delete/shippings-by-id', {
    data: {
      shippingSelectedById,
    },
  });
  return data;
};

export const getShippingsGroupApi = async () => {
  //TODO
};
