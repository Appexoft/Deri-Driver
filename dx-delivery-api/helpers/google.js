const { Client } = require("@googlemaps/google-maps-services-js");
const { logger } = require("../helpers/logger");

const fetchGeocode = async (address, place_id) => {
  const mapsClient = new Client({});
  const params = {
    params: {
      // eslint-disable-next-line no-undef
      key: process.env.G_MAP_API_KEY,
      address: address,
      place_id: place_id,
      components: place_id ? {} : { country: "uy" },
    },
  };

  try {
    const { data } = await mapsClient.geocode(params);

    logger.info("fetchGeocode success", { params, data });

    if (data.status === "ZERO_RESULTS") {
      return;
    }

    const result = data.results[0];

    const postalCode =
      result &&
      result.address_components.find((item) => item.types[0] === "postal_code")
        ?.long_name;
    const city =
      (result &&
        result.address_components.find((item) => item.types[0] === "locality")
          ?.long_name) ||
      "";
    const address = (result && result.formatted_address) || "";
    const streetName =
      (result &&
        result.address_components.find(
          (item) =>
            item.types[0] === "route" || item.types[0] === "intersection"
        )?.long_name) ||
      "";
    let streetNumber =
      result &&
      result.address_components.filter(
        (item) => item.types[0] === "street_number"
      );
    streetNumber =
      (streetNumber?.length > 0 && streetNumber[0]?.long_name) || "";

    return {
      streetName,
      streetNumber,
      postalCode,
      city,
      address,
      location: {
        lat: result?.geometry.location.lat || 0,
        long: result?.geometry.location.lng || 0,
      },
    };
  } catch (error) {
    logger.error("fetchGeocode", { params, error });
  }
};

const fetchSuggestedLocations = async (queryAddress) => {
  // filter addresses to get only if has an address like 'street+space+number'

  const mapsClient = new Client({});
  const params = {
    params: {
      // eslint-disable-next-line no-undef
      key: process.env.G_MAP_API_KEY,
      input: queryAddress,
      components: ["country:uy"],
      language: "es",
      // restric results to specifc area
      // eslint-disable-next-line no-undef
      radius: process.env.SUGGEST_LOCATIONS_RADIUS,
      location: {
        // eslint-disable-next-line no-undef
        lat: process.env.SUGGEST_LOCATIONS_LAT,
        // eslint-disable-next-line no-undef
        lng: process.env.SUGGEST_LOCATIONS_LNG,
      },
      strictbounds: true,
    },
  };

  try {
    let results = [];

    const resp = await mapsClient.placeAutocomplete(params);

    logger.info("fetchSuggestedLocations success", {
      params,
      resp: resp.data,
    });

    if (resp.status === "ZERO_RESULTS") {
      return;
    }

    results = resp.data.predictions
      // eslint-disable-next-line no-undef
      .slice(0, process.env.MAX_SUGGEST_LOCATIONS)
      .map((e) => {
        return {
          name: e.description,
          main_text: e.structured_formatting.main_text,
          place_id: e.place_id,
        };
      });

    return results;
  } catch (error) {
    logger.error("fetchSuggestedLocations", { params, error });
  }
};

const getPlaceId = async (queryAddress) => {
  // filter addresses to get only if has an address like 'street+space+number'

  const mapsClient = new Client({});
  const params = {
    params: {
      // eslint-disable-next-line no-undef
      key: process.env.G_MAP_API_KEY,
      input: queryAddress,
      components: ["country:uy"],
      language: "es",
      // restric results to specifc area
      // eslint-disable-next-line no-undef
      radius: process.env.SUGGEST_LOCATIONS_RADIUS,
      location: {
        // eslint-disable-next-line no-undef
        lat: process.env.SUGGEST_LOCATIONS_LAT,
        // eslint-disable-next-line no-undef
        lng: process.env.SUGGEST_LOCATIONS_LNG,
      },
      strictbounds: true,
    },
  };

  try {
    const resp = await mapsClient.placeAutocomplete(params);

    logger.info("fetchSuggestedLocations success", {
      params,
      resp: resp.data,
    });

    if (resp.status === "ZERO_RESULTS") {
      return false;
    }

    return resp.data.predictions[0].place_id;
  } catch (error) {
    logger.error("fetchSuggestedLocations", { params, error });
  }
};

module.exports = {
  fetchGeocode,
  fetchSuggestedLocations,
  getPlaceId
};
