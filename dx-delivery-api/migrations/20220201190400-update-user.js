"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "enableCollection", {
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
