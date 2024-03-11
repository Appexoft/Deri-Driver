"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "ClientId", {
      type: Sequelize.UUID,
    });
    await queryInterface.addColumn("shippings", "UserId", {
      type: Sequelize.UUID,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
