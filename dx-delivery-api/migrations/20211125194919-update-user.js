"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "addressStreet", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("users", "addressNumber", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("users", "addressCity", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("users", "addressFloor", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("users", "addressLocation", {
      type: Sequelize.GEOMETRY,
    });
    await queryInterface.addColumn("users", "addressPostalCode", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};