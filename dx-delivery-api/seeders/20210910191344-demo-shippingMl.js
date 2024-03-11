"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "shippings_ml",
      [
        {
          shippingml_id: uuidv4(),
          flex: false,
          clientMl: "Testing Client",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("shippings_ml", null, {});
  },
};
