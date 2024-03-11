export const formatShippingData = (apiObject, clean) => {
  if (clean) {
    return {
      receiverDetails: {
        name: '',
        phone: '',
        details: '',
      },
      type: '',
      packages: {},
      method: '',
      destinationType: 'MVD',
      origin: {
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
      },
      destination: {
        department: '',
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
      },
    };
  }

  const {
    originStreet,
    originNumber,
    originFloor,
    originPostalCode,
    destinyStreet,
    destinyNumber,
    destinyFloor,
    destinyPostalCode,
    department,
  } = apiObject;

  return {
    type: '',
    method: '',
    origin: {
      streetName: originStreet,
      streetNumber: originNumber,
      streetFloor: originFloor,
      postalCode: originPostalCode,
      address: `${originStreet} ${originNumber}`,
      location: {
        lat: -34.8824311,
        long: -56.1758958,
      },
    },
    destination: {
      department: department,
      streetName: destinyStreet,
      streetNumber: destinyNumber,
      streetFloor: destinyFloor,
      postalCode: destinyPostalCode,
      address: `${destinyStreet} ${destinyNumber}`,
      location: {
        lat: -34.8824311,
        long: -56.1758958,
      },
    },
  };
};

export const formatDataToSend = (form, type) => {
  if (type === 'destination') {
    const {
      streetName,
      streetNumber,
      streetFloor,
      postalCode,
      city,
      location,
      department,
    } = form;
    return {
      destinyStreet: streetName,
      destinyNumber: streetNumber,
      destinyFloor: streetFloor,
      destinyCity: city,
      destinyPostalCode: postalCode,
      destinyLocation: {
        type: 'Point',
        coordinates: [location.lat, location.long],
      },
      destinyDepartment: department,
    };
  }

  const {streetName, streetNumber, streetFloor, city, postalCode, location} =
    form;

  return {
    originStreet: streetName,
    originNumber: streetNumber,
    originFloor: streetFloor,
    originCity: city,
    originPostalCode: postalCode,
    originLocation: {
      type: 'Point',
      coordinates: [location.lat, location.long],
    },
  };
};
