"use strict";

const { shippingMethods } = require("../helpers/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "shippingMethod", {
      type: Sequelize.STRING,
      defaultValue: shippingMethods.ORDER,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings");
  },
};
