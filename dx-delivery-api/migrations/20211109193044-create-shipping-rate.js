
"use strict";

const { shippingType } = require("../helpers/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shipping_rates", {
      shipping_rate_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      typeOfShipping: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: shippingType.COMMON,
      },
      startAt: {
        type: Sequelize.DATE,
      },
      finishAt: {
        type: Sequelize.DATE,
      },
      date: {
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      isClose: {
        type: Sequelize.BOOLEAN,
      },
      DestinyZoneId: {
        type: Sequelize.UUID,
      },
      OriginZoneId: {
        type: Sequelize.UUID,
      },
      packageSize: {
        type: Sequelize.STRING,
      },
      CompanyId: {
        type: Sequelize.UUID,
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("shipping_rates");
  },
};
