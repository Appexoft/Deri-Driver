"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "ShippingRateId", {
      type: Sequelize.UUID,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
