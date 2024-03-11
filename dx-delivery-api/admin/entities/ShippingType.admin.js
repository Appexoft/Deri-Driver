const { ShippingType } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    name: {
      isVisible: true,
      isTitle: true,
    },
    description: {
      isVisible: true,
      isTitle: false,
    },
    capacity: {
      isVisible: true,
      isTitle: false,
    },
    icon: {
      isVisible: true,
      isTitle: false,
    },
  },
  filterProperties: ["name", "description", "capacity"],
  listProperties: ["name", "description", "capacity"],
  showProperties: ["name", "description", "capacity"],
};

module.exports = {
  options,
  resource: ShippingType,
};
