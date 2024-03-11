const { Agency } = require("../../models");

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
  },
  filterProperties: ["name"],
  listProperties: ["name"],
  showProperties: ["name"],
  sort: { direction: "asc", sortBy: "name" },
};

module.exports = {
  options,
  resource: Agency,
};
