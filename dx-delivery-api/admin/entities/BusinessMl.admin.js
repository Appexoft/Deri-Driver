const { BusinessMl } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    BusinessId: {
      isTitle: true,
      isRequired: true,
      reference: 'businesses',
      isSortable: true
    },
    token: {
      isSortable: false
    },
    tokenType: {
      isSortable: false
    },
    scope: {
      isSortable: false
    },
    refreshToken: {
      isSortable: false
    },
    refreshTokenExpiration: {
      isSortable: false
    },
    tokenExpiration: {
      isSortable: false
    },
    clientMl: {
      isSortable: false
    },
    createdAt: {
      isSortable: true,
      isVisible: true
    },
    updatedAt: {
      isVisible: false
    },
    deletedAt: {
      isVisible: false
    }
  },
  filterProperties: ["id", "BusinessId"],
  listProperties: ["id", "BusinessId", "createdAt"],
  sort: { direction: "desc", sortBy: "createdAt" },
};

module.exports = {
  options,
  resource: BusinessMl,
};
