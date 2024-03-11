/*const {
  before: passwordBeforeHook,
  after: passwordAfterHook,
} = require("../actions/password.hook");*/
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const { typesList } = require("../../helpers/constants");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    authId: {
      isRequired: true,
      isVisible: true,
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
    role: {
      isVisible: { filter: false, show: true, edit: true, list: true },
      isRequired: true,
      availableValues: typesList,
    },
    CompanyId: {
      isVisible: true,
    },
  },
  filterProperties: ["name", "email", "phone", "role"],
  listProperties: ["name", "email", "phone", "role", "enableCollection"],
  showProperties: ["name", "phone", "email", "ci", "type", "role"],
  sort: { direction: "asc", sortBy: "name" },
  actions: {
    new: {
      before: async (request) => {
        return {
          ...request,
          payload: {
            ...request.payload,
            id: uuidv4()
          }
        }
      }
    }
  }
};

module.exports = {
  options,
  resource: User,
};
