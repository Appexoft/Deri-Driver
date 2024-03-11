/*const {
  before: passwordBeforeHook,
  after: passwordAfterHook,
} = require("../actions/password.hook");*/
const { riders } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  id: "riders",
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
    phone: {
      isRequired: true,
    },
    email: {
      isTitle: true,
      isRequired: true,
    },
    ci: {
      isRequired: true,
    },
  },
  filterProperties: ["name", "email", "phone"],
  listProperties: ["name", "email", "phone"],
  showProperties: ["name", "phone", "email", "ci"],
  sort: { direction: "asc", sortBy: "name" },
};

module.exports = {
  options,
  resource: riders,
};
