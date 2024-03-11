"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "AgencyId", {
      type: Sequelize.UUID,
    });
    await queryInterface.addColumn("shippings", "destinyDepartment", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
