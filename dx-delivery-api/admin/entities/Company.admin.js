const { Company } = require("../../models");

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
    businessName: {
      isTitle: true,
      isRequired: true,
    },
    rut: {
      isRequired: true,
    },
    phone: {
      isVisible: true,
    },
    referredCode: {
      isVisible: true,
    },
  },
  filterProperties: ["name", "rut", "businessName"],
  listProperties: ["name", "rut", "businessName"],
  showProperties: ["name", "rut", "businessName"],
  sort: { direction: "asc", sortBy: "name" },
};

module.exports = {
  options,
  resource: Company,
};
