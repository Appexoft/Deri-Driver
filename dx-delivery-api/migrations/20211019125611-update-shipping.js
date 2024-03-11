"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "undeliveredReason", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("shippings", "undeliveredReasonDetails", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
