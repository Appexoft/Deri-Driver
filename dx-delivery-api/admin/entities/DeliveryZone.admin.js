const { DeliveryZone } = require("../../models");

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
    CompanyId: {
      isRequired: true,
      reference: 'companies'
    },
    BranchId: {
      isRequired: false,
    }
  },
  filterProperties: ["name", "CompanyId"],
  listProperties: ["name", "CompanyId"],
  showProperties: ["id", "name", "CompanyId", "BranchId"],
  sort: { direction: "asc", sortBy: "name" },
};

module.exports = {
  options,
  resource: DeliveryZone,
};
