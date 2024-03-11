const { CompanyMl } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    clientId: {
      isTitle: true,
      isRequired: true,
    },
    clientSecret: {
      isTitle: true,
      isRequired: true,
    },
  },
  filterProperties: ["clientId"],
  listProperties: ["clientId"],
  showProperties: ["clientId"],
  sort: { direction: "asc", sortBy: "clientId" },
};

module.exports = {
  options,
  resource: CompanyMl,
};
