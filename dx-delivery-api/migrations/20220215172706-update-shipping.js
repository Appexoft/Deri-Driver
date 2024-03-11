"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "packages", {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};