const { Parameter } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    key: {
      isId: true,
      isRequired: true,
      position: 0,
    },
    description: {
      isTitle: true,
      isRequired: true,
      position: 1,
    },
    value: {
      isTitle: true,
      isRequired: true,
      position: 2,
    },
    CompanyId: {
      isVisible: false,
    },
  },
  filterProperties: ["description", "value"],
  listProperties: ["description", "value"],
  showProperties: ["key", "description", "value"],
  sort: { direction: "asc", sortBy: "key" },
  actions: { delete: { isVisible: false } },
};

module.exports = {
  options,
  resource: Parameter,
};
