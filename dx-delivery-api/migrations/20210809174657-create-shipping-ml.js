"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shippings_ml", {
      shippingml_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      flex: {
        type: Sequelize.BOOLEAN,
      },
      clientMl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      ShippingId: {
        type: Sequelize.UUID,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("shippings_ml");
  },
};
