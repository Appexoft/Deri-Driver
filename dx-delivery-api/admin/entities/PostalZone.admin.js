const { PostalZone } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    PostalCodeId: {
      isVisible: true,
      isTitle: true,
    },
    DeliveryZoneId: {
      isVisible: true,
      isTitle: true,
    },
  },
  filterProperties: ["DeliveryZoneId", "PostalCodeId"],
  listProperties: ["DeliveryZoneId", "PostalCodeId"],
  showProperties: ["DeliveryZoneId", "PostalCodeId"],
};

module.exports = {
  options,
  resource: PostalZone,
};
