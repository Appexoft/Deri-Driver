const { PackageType } = require("../../models");

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
      position: 0,
    },
    description: {
      isTitle: true,
      position: 1,
    },
  },
  filterProperties: ["name", "description"],
  listProperties: ["name", "description"],
  showProperties: ["id", "name", "description"],
  sort: { direction: "asc", sortBy: "name" },
  actions: { delete: { isVisible: true } },
};

module.exports = {
  options,
  resource: PackageType,
};
