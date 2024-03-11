const { packages } = require("../../helpers/constants");
const { PackagePrice } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    ShippingTypeId: {
      isTitle: true,
      isRequired: true,
    },
    packageSize: {
      isRequired: true,
      availableValues: packages,
    },
    price: {
      isTitle: true,
      isRequired: true,
    },
    CompanyId: {
      isVisible: false,
    },
  },
  filterProperties: ["typeOfShipping", "packageSize", "price"],
  listProperties: ["typeOfShipping", "packageSize", "price"],
  showProperties: ["typeOfShipping", "packageSize", "price"],
  sort: { direction: "asc", sortBy: "ShippingTypeId" },
};

module.exports = {
  options,
  resource: PackagePrice,
};
