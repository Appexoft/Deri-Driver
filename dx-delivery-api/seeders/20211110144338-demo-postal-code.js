"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "postal_codes",
      [
        {
          postal_code_id: uuidv4(),
          code: 11100,
          neighbourhood: "Barrio Sur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postal_code_id: uuidv4(),
          code: 11200,
          neighbourhood: "Cordón",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postal_code_id: uuidv4(),
          code: 11300,
          neighbourhood: "Punta Carretas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postal_code_id: uuidv4(),
          code: 11600,
          neighbourhood: "Parque Batlle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postal_code_id: uuidv4(),
          code: 11800,
          neighbourhood: "Goes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("postal_codes", null, {});
  },
};
