"use strict";
const { v4: uuidv4 } = require("uuid");
const model = require("../models");

module.exports = {
  up: async (queryInterface) => {
    const business = await model.Business.findOne({ raw: true, where: {
      businessName: 'TETE5420900'
    } });
    return queryInterface.bulkInsert("businesses_ml", [
      {
        businessml_id: uuidv4(),
        clientMl: "788617981",
        createdAt: new Date(),
        updatedAt: new Date(),
        BusinessId: business.id,
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("businesses_ml", null, {});
  },
};
