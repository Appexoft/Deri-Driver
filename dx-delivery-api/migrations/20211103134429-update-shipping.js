"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "clientDni", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
