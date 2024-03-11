"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shippings_ml", "ShippingId", {
      type: Sequelize.UUID,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings_ml");
  },
};
