const { Business } = require("../../models");

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
    rut: {
      isRequired: true,
    },
    businessName: {
      isTitle: true,
      isRequired: true,
    },
    CompanyId: {
      isVisible: false,
    },
  },
  filterProperties: ["name", "rut", "businessName", "CompanyId"],
  listProperties: ["name", "rut", "businessName", "CompanyId"],
  showProperties: ["name", "rut", "businessName", "CompanyId"],
  sort: { direction: "asc", sortBy: "name" },
};

module.exports = {
  options,
  resource: Business,
};
