"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "DeliveryNeighborhoodId", {
      type: Sequelize.UUID,
    });
    await queryInterface.addColumn("shippings", "PostalCodeId", {
      type: Sequelize.UUID,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
