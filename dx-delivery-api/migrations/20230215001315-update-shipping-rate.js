"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shipping_rates", "ShippingTypeId", {
      type: Sequelize.UUID,
    });
    await queryInterface.removeColumn("shipping_rates", "typeOfShipping");
    await queryInterface.removeColumn("shipping_rates", "shippingMethod");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shipping_rates", "ShippingTypeId");
    await queryInterface.addColumn("shipping_rates", "typeOfShipping", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("shipping_rates", "shippingMethod", {
      type: Sequelize.STRING,
    });
  },
};
