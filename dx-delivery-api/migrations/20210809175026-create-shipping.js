"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "CREATE SEQUENCE shipping_number_sequence start 1 increment 1;"
    );

    await queryInterface.createTable("shippings", {
      shipping_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      number: {
        type: Sequelize.INTEGER,
        unique: true,
        defaultValue: Sequelize.literal("nextval('shipping_number_sequence')"),
      },
      type: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      client: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.STRING,
      },
      originStreet: {
        type: Sequelize.STRING,
      },
      originCity: {
        type: Sequelize.STRING,
      },
      originNumber: {
        type: Sequelize.INTEGER,
      },
      originLocation: {
        type: Sequelize.GEOMETRY,
      },
      originPostalCode: {
        type: Sequelize.STRING,
      },
      originFloor: {
        type: Sequelize.STRING,
      },
      destinyStreet: {
        type: Sequelize.STRING,
      },
      destinyNumber: {
        type: Sequelize.INTEGER,
      },
      destinyLocation: {
        type: Sequelize.GEOMETRY,
      },
      destinyPostalCode: {
        type: Sequelize.STRING,
      },
      destinyFloor: {
        type: Sequelize.STRING,
      },
      destinyCity: {
        type: Sequelize.STRING,
      },
      comments: {
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
      BusinessId: {
        type: Sequelize.UUID,
      },
      RiderId: {
        type: Sequelize.UUID,
      },
      DeliveryZoneId: {
        type: Sequelize.UUID,
      },
      CompanyId: {
        type: Sequelize.UUID,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
      "DROP SEQUENCE shipping_number_sequence"
    );
    await queryInterface.removeColumn("shippings", "shipping_number_sequence");
    await queryInterface.dropTable("shippings");
  },
};
