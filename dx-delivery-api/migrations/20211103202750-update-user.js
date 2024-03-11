"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "BusinessId", {
      type: Sequelize.UUID,
    });
    await queryInterface.addColumn("users", "enrollment", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
