"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("businesses", [
      {
        business_id: uuidv4(),
        name: "Dixtra",
        rut: "5342AR",
        businessName: "Tolenka SA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        business_id: uuidv4(),
        name: "Usuario de prueba (ML-FRAN)",
        rut: "1234567890",
        businessName: "TETE5420900",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("businesses", null, {});
  },
};
