const { v4: uuidv4 } = require("uuid");
const { roles } = require("../helpers/constants");
const { sequelize } = require("../models");

("use strict");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("users", [
      {
        user_id: uuidv4(),
        authId: "auth0|617c4e7c9ee89a006841c55f",
        name: "Exequiel Morales",
        email: "mathias.morales@dixtra.co",
        role: roles.ADMIN,
        phone: "098543212",
        ci: "52796477",
        addressStreet: "Plaza independencia",
        addressCity: "Colonia",
        addressNumber: "10500",
        addressFloor: "Puerta Roja",
        addressPostalCode: "11300",
        addressLocation: sequelize.fn(
          "ST_GeomFromText",
          "POINT(50.871962 4.287370999999999)"
        ),
        BranchId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: uuidv4(),
        authId: "auth0|6179aca81e38d9006864eddc",
        name: "francisco crizul",
        email: "francisco.crizul@dixtra.co",
        role: roles.CLIENT,
        phone: "091099125",
        ci: "47936890",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
