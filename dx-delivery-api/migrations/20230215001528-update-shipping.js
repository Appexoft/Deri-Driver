"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("shippings", "details", {
      type: Sequelize.STRING(280),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("shippings", "details", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};

