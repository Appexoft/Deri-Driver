const { Branch } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    name: {
      isTitle: true,
      isRequired: true,
    },
    streetName: {
      isVisible: true,
      isTitle: true,
    },
    streetFloor: {
      isVisible: true,
    },
    streetNumber: {
      isVisible: true,
    },
    city: {
      isVisible: true,
    },
    location: {
      isVisible: false,
    },
    serviceHours: {
      isVisible: true,
    },
    phone: {
      isVisible: true,
    },
    CompanyId: {
      isVisible: false,
    },
  },
  filterProperties: ["name", "rut", "businessName"],
  listProperties: ["name", "rut", "businessName"],
  showProperties: ["name", "rut", "businessName"],
  sort: { direction: "asc", sortBy: "name" },
};

module.exports = {
  options,
  resource: Branch,
};
