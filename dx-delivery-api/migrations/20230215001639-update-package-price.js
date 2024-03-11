"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("package_prices", "ShippingTypeId", {
      type: Sequelize.UUID,
    });
    await queryInterface.removeColumn("package_prices", "typeOfShipping");
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("package_prices", "ShippingTypeId");
    await queryInterface.addColumn("package_prices", "typeOfShipping", {
      type: queryInterface.STRING,
      allowNull: false,
    });
  },
};
