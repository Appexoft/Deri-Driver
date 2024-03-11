"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "ShippingTypeId", {
      type: Sequelize.UUID,
    });
    await queryInterface.removeColumn("shippings", "type");
    await queryInterface.removeColumn("shippings", "shippingMethod");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shippings", "ShippingTypeId");
    await queryInterface.addColumn("shippings", "type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("shippings", "shippingMethod", {
      type: Sequelize.STRING,
    });
  },
};
