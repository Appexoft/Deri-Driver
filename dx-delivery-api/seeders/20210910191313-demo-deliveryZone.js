"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "delivery_zones",
      [
        {
          delivery_zone_id: uuidv4(),
          name: "Zona Flash",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("delivery_zones", null, {});
  },
};
