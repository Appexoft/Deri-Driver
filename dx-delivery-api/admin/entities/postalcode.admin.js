const { PostalCode } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    neighbourhood: {
      isTitle: true,
      isRequired: true,
    },
    code: {
      isTitle: false,
      isRequired: true,
    },
    CompanyId: {
      isVisible: true,
      reference: 'companies',
      isRequired: true
    },
  },
  filterProperties: ["neighbourhood", "code"],
  listProperties: ["neighbourhood", "code", "CompanyId"],
  showProperties: ["neighbourhood", "code", "CompanyId"],
  sort: { direction: "asc", sortBy: "code" },
};

module.exports = {
  options,
  resource: PostalCode,
};
