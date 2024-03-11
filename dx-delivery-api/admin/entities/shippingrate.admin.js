const { ShippingRate } = require("../../models");
const { ValidationError } = require("adminjs");
const { dayOfWeekList } = require("../../helpers/constants");
const AdminBro = require("adminjs");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
      position: 1,
    },
    CompanyId: {
      isVisible: true,
      isRequired: true,
      position: 2,
    },
    ShippingTypeId: {
      isVisible: true,
      position: 3,
      isRequired: true,
    },
    OriginZoneId: {
      isVisible: true,
      position: 4,
      isRequired: true,
    },
    DestinyZoneId: {
      isVisible: true,
      position: 5,
      isRequired: true,
    },
    date: {
      isVisible: true,
      position: 6,
    },
    day: {
      isVisible: true,
      position: 7,
      availableValues: dayOfWeekList,
    },
    finishAt: {
      isVisible: true,
      position: 8,
      components: {
        edit: AdminBro.bundle("../components/time"),
      },
      isRequired: true,
    },
    price: {
      isVisible: true,
      position: 9,
      isRequired: true,
    },
    isClose: {
      isVisible: true,
      position: 10,
    },
  },
  filterProperties: [
    "DestinyZoneId",
    "OriginZoneId",
    "packageSize",
    "isClose",
    "price",
    "date",
    "day",
  ],
  listProperties: [
    "DestinyZoneId",
    "OriginZoneId",
    "packageSize",
    "isClose",
    "price",
    "date",
    "day",
    "finishAt",
    "CompanyId"
  ],
  showProperties: [
    "DestinyZoneId",
    "OriginZoneId",
    "packageSize",
    "isClose",
    "price",
    "date",
    "finishAt",
    "CompanyId"
  ],
  sort: { direction: "asc", sortBy: "price" },
  actions: {
    new: {
      before: async (request) => {
        request.payload.enabled = !!request.payload.enabled;
        const errors = {};

        const { price, finishAt } = request.payload;

        if (!price) {
          errors.price = {
            message: "El precio es obligatorio",
          };
        }

        if (!finishAt) {
          errors.finishAt = {
            message: "La fecha limite es obligatoria",
          };
        }

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors, {
            message: "Ocurrió un error, verifica los campos.",
          });
        }

        return request;
      },
    },
  },
};

module.exports = {
  options,
  resource: ShippingRate,
};
